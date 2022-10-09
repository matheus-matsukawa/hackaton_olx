import pandas as pd
import numpy as np
import sys

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.tree import DecisionTreeRegressor

###
# Pré-processamento dos dados 
###

df = pd.read_csv('./price_predict/train.csv')
rename = {
    'TARGET(PRICE_IN_LACS)':'TARGET',
}
df = df.rename(columns=rename)
df = df.drop(columns=['LONGITUDE', 'LATITUDE'])

id, string = df.ADDRESS.factorize()
encoder = OneHotEncoder()
id_enc = encoder.fit_transform(id.reshape(-1,1))
id_enc = id_enc.toarray()

teste = pd.DataFrame(id_enc, columns=string.values)

cols = teste.sum()[teste.sum() > 50].index.to_numpy()
teste = teste[cols]

df = pd.concat([df, teste], axis = 1)
df.drop(columns='ADDRESS', inplace=True)
df['POSTED_BY'] = np.where(df.POSTED_BY=='Owner', 1,
                           np.where(df.POSTED_BY=='Dealer', 2,3))
df['BHK_OR_RK'] = np.where(df.BHK_OR_RK=='BHK', 1,0)
df = df.astype(float)

df_treino, df_teste = train_test_split(df, test_size = 0.2, random_state=13)  

df_treino = df_treino[df_treino['TARGET'] <= 100.0]
df_teste = df_teste[df_teste['TARGET'] <= 100.0]

###
# Treinamento
###

lin_reg = LinearRegression()
targ = df_treino['TARGET']
df_treino.drop(columns='TARGET', inplace=True)
lin_reg.fit(df_treino, targ)

###
# Recebimento e tratamento dos inputs
###

lista_end = teste.columns.values
cidade_bairro = str(sys.argv[9])
i, = np.where(lista_end == cidade_bairro)
temp = i[0]
lista = []
for i in range(len(teste.columns.values)):
  lista.append(0)
lista[temp] = 1.0
client_list = []
for i in range(1,9):
    element = float(sys.argv[i])
    client_list.append(element)

client_list = client_list + lista

###
# Predição em cima do input do usuário
###

final = pd.DataFrame(columns=df_treino.columns.values)
final.loc[len(final)] = client_list

predicao = lin_reg.predict(final)
print((predicao[0] * 100000).round(2))
