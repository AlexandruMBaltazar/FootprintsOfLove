export const detailTypes = [
  {
    name: "Basics",
    values: new Map()
      .set("gender", "Gender")
      .set("relationship", "Relationship"),
  },
  {
    name: "Looks",
    values: new Map().set("height", "Height").set("body_type", "Body type"),
  },
  {
    name: "Background",
    values: new Map()
      .set("ethnicity", "Ethnicity")
      .set("politics", "Politics")
      .set("language", "Language")
      .set("education", "Education")
      .set("employment", "Employment")
      .set("religion", "Religion")
      .set("sign", "Sign"),
  },
  {
    name: "Lifestyle",
    values: new Map()
      .set("smoke", "Smoke")
      .set("drink", "Drink")
      .set("diet", "Diet"),
  },
  {
    name: "Family",
    values: new Map().set("child", "Child").set("pet", "Pet"),
  },
];
