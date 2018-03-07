// The GraphQL schema in string form
export const typeDefs = `
  type Query { catalog: [Catalog] }
  type Catalog { 
      id: ID!, 
      title: String!,
      description: String,
      metaTitle: String,
      metaDescription: String,
      content: String,
      categoryId: Int,
      languageCode: Language,
      image: String,
      order: Int,
      active: Boolean,
      parentId: Int,
      parentTitle: String
    }
   enum Language {
       ru,
       en
   }
`;