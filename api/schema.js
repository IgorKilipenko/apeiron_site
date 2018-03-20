// The GraphQL schema in string form
export const typeDefs = `
  type Query { catalog: [Catalog] }
    type Catalog { 
        id: ID!
        title: String!
        description: String
        metaTitle: String
        metaDescription: String
        content: String
        image: String
        order: Int
        active: Boolean
        category: ProductCategory
        group: ProductGroup
        details: [ProductDetails]
        }
    type ProductCategory {
        id: ID!
        title: String
    }
    type ProductGroup {
        id: ID!
        title: String
    }
    type ProductDetails {
        id: ID!
        title: String
        contentType: String
        value: String
        description: String
        text: [DetailsTextBlock]
    }
    type DetailsTextBlock {
        value: String
        tag: String
    }
`;