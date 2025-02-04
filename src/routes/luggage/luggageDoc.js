const { swaggerResponse } = require("../../utils/swaggerResponse");

const createLuggageStoreDoc = {
  post: {
    tags: ["Luggage"],
    summary: "Create A New Luggage store",
    description: "Endpoint to create a new Luggage Store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeName: {
                type: "string",
                description: "Store name is required",
              },
              providerName: {
                type: "string",
                description: "Provider name is required",
              },
              providerEmail: {
                type: "string",
                description: "Provider email is required",
              },
              providerMobile: {
                type: "string",
                description: "Provider Mobile is required",
              },
              countryName: {
                type: "string",
                description: "Country Name is required",
              },
              cityName: {
                type: "string",
                description: "City Name is required",
              },
              mapLat: {
                type: "number",
                format: "float",
                description: "Map lat is required",
              },
              mapLan: {
                type: "number",
                format: "float",
                description: "Map lan is required",
              },
              price: {
                type: "number",
                format: "float",
                description: "Price is required",
              },
              address: {
                type: "string",
                description: "Address is required",
              },
              zipCode: {
                type: "string",
                description: "Zip code is required",
              },
              road: {
                type: "string",
                description: "Road is required",
              },
              house: {
                type: "string",
                description: "House is required",
              },
              openingTime: {
                type: "string",
                description: "Opening Time (YYYY-MM-DD HH:mm:ss)",
              },
              closingTime: {
                type: "string",
                description: "Closing Time (YYYY-MM-DD HH:mm:ss)",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const getNearestStoreDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get Nearest store",
    description: "Endpoint to get nearest store by lat lon",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "lat",
        in: "path",
        required: true,
        description: "google map lat",
        schema: {
          type: "string",
        },
      },
      {
        name: "lan",
        in: "path",
        required: true,
        description: "google map lan",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getAllStoreDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get all store",
    description: "Endpoint to get all store",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getStoreDetailsDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get Store details",
    description: "Endpoint to get store details.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "storeId",
        in: "path",
        required: true,
        description: "ID of the store",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const luggageStoreBookingDoc = {
  post: {
    tags: ["Luggage"],
    summary: "booking store endpoin",
    description: "Endpoint to booking a new Luggage Store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              customrName: {
                type: "string",
                description: "Customer name is required",
              },
              customerId: {
                type: "number",
                description: "Customer id is required",
              },
              storeName: {
                type: "string",
                description: "Store name is required",
              },
              storeId: {
                type: "number",
                description: "Store id is required",
              },
              providerName: {
                type: "string",
                description: "Provider Name is required",
              },
              providerId: {
                type: "number",
                description: "Provider Id is required",
              },
              hour: {
                type: "number",
                format: "float",
                description: "Hour is required",
              },
              status: {
                type: "string",
                description: "Status is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const getUserActiveBookingDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get user active luggage store",
    description: "Endpoint to get user active luggage order.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "customerId",
        in: "path",
        required: true,
        description: "ID of the customer",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getUserPreviousBookingDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get user Previous luggage store",
    description: "Endpoint to get user previous luggage order.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "customerId",
        in: "path",
        required: true,
        description: "ID of the customer",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getStoreOrderSummeryDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get luggage store order details",
    description: "Endpoint to get order details by id.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "orderId",
        in: "path",
        required: true,
        description: "ID of the order",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getStoreReviewDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get luggage store review",
    description: "Endpoint to get store review by store id.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "storeId",
        in: "path",
        required: true,
        description: "ID of the store",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const getFavoriteStoreDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get favorite store",
    description: "Endpoint to get favorite store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "userId",
        in: "path",
        required: true,
        description: "ID of user",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const luggageStoreReviewDoc = {
  post: {
    tags: ["Luggage"],
    summary: "submit store review",
    description: "Endpoint to submit a review for Store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: {
                type: "number",
                description: "User Id is required",
              },

              userName: {
                type: "string",
                description: "User name is required",
              },
              storeId: {
                type: "number",
                description: "Store id is required",
              },
              rating: {
                type: "number",
                description: "rating is required",
              },
              comment: {
                type: "string",
                description: "Comment is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const makeFavoriteStoreDoc = {
  post: {
    tags: ["Luggage"],
    summary: "make favorite store",
    description: "Endpoint to make favorite Store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: {
                type: "number",
                description: "User Id is required",
              },

              storeId: {
                type: "number",
                description: "Store id is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const removeFavoriteStoreDoc = {
  delete: {
    tags: ["Luggage"],
    summary: "Remove favorite store",
    description: "Endpoint to remove favorite store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "storeId",
        in: "path",
        required: true,
        description: "ID of the store Id",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const rebookLuggageStoreDoc = {
  patch: {
    tags: ["Luggage"],
    summary: "Rebook loggage store",
    description: "Endpoint to rebook luggage store.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "customerId",
        in: "path",
        required: true,
        description: "ID of the customer",
        schema: {
          type: "string",
        },
      },
      {
        name: "bookingId",
        in: "path",
        required: true,
        description: "ID of the store",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const getAllOrderListDoc = {
  get: {
    tags: ["Luggage"],
    summary: "Get all order list",
    description: "Endpoint to get all order list.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
module.exports = {
  createLuggageStoreDoc,
  getNearestStoreDoc,
  getAllStoreDoc,
  getStoreDetailsDoc,
  luggageStoreBookingDoc,
  getUserActiveBookingDoc,
  getUserPreviousBookingDoc,
  getStoreOrderSummeryDoc,
  luggageStoreReviewDoc,
  getStoreReviewDoc,
  makeFavoriteStoreDoc,
  getFavoriteStoreDoc,
  removeFavoriteStoreDoc,
  rebookLuggageStoreDoc,
  getAllOrderListDoc,
};
