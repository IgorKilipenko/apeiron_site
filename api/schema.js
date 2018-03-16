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
        image: String,
        order: Int,
        active: Boolean,
        category: ProductCategory,
        group: ProductGroup,
        details: ID
        }
    type ProductCategory {
        id: ID!
        title: String,
    }
    type ProductGroup {
        id: ID!
        title: String,
    }
`;