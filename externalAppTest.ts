const user = {
  name: "Matheus",
  city: "Rio Bonito",
};

await Deno.writeTextFile("./temp/test.json", JSON.stringify(user));
