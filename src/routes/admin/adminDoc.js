const { swaggerResponse } = require("../../utils/swaggerResponse");

const createAdminDoc = {
  post: {
    tags: ["Admin"],
    summary: "Create A New Admin",
    description: "Endpoint to create a new Admin.",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name is required",
              },
              email: {
                type: "string",
                description: "Email is required",
              },
              password: {
                type: "string",
                description: "Password is required",
              },
              mobile: {
                type: "string",
                description: "Mobile is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

const adminLoginDoc = {
  post: {
    tags: ["Admin"],
    summary: "Admin Login api",
    description: "Endpoint to login an admin.",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "Email is required",
              },
              password: {
                type: "string",
                description: "Password is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

const getAllAdminDoc = {
  get: {
    tags: ["Admin"],
    summary: "Get all Admin List",
    description: "Endpoint to get all list of admin.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const getAdminByIdDoc = {
  get: {
    tags: ["Admin"],
    summary: "Get all Admin by id",
    description: "Endpoint to get admin by id.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the admin to update",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const deleteAdminDoc = {
  put: {
    tags: ["Admin"],
    summary: "Delete admin",
    description: "Endpoint to delete admin.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the admin to delete",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const updateAdminDoc = {
  patch: {
    tags: ["Admin"],
    summary: "Update admin by ID",
    description: "Endpoint to update an existing admin by their ID.",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "id",
        in: "path",
        required: true,
        description: "ID of the admin to update",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                description: "Name is required",
              },
              mobile: {
                type: "string",
                description: "Mobile is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

module.exports = {
  createAdminDoc,
  adminLoginDoc,
  getAllAdminDoc,
  getAdminByIdDoc,
  deleteAdminDoc,
  updateAdminDoc,
};
