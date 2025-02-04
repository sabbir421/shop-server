const { swaggerResponse } = require("../../utils/swaggerResponse");

const createUserDoc = {
  post: {
    tags: ["Customer"],
    summary: "Create A New Customer",
    description: "Endpoint to create a new customer.",
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
              firebaseToken: {
                type: "string",
                description: "firebase token is required",
              },
              otp: {
                type: "integer",
              },
              loginId: {
                type: "integer",
                description: "loginId is required",
              },
              regType: {
                type: "string",
                description: "regType is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const updateCustomerDoc = {
  patch: {
    tags: ["Customer"],
    summary: "Update Customer by ID",
    description: "Endpoint to update an existing customer by their ID.",
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
        description: "ID of the customer to update",
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
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

const createVendorDoc = {
  post: {
    tags: ["Vendor"],
    summary: "Create A New Vendor",
    description: "Endpoint to create a new vendor.",
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
              firebaseToken: {
                type: "string",
                description: "firebase token is required",
              },
              otp: {
                type: "integer",
              },
              loginId: {
                type: "integer",
                description: "loginId is required",
              },
              regType: {
                type: "string",
                description: "regType is required",
              },
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const sendOtpDoc = {
  post: {
    tags: ["Customer"],
    summary: "email validation otp",
    description: "Endpoint to send email otp",
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
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};
const sendVendorOtpDoc = {
  post: {
    tags: ["Vendor"],
    summary: "email validation otp",
    description: "Endpoint to send email otp",
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
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

const vendorLoginDoc = {
  post: {
    tags: ["Vendor"],
    summary: "Vendor Login api",
    description: "Endpoint to login Vendor.",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              credential: {
                type: "string",
                description: "Email or mobile is required",
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
const customerLoginDoc = {
  post: {
    tags: ["Customer"],
    summary: "Customer Login api",
    description: "Endpoint to login Customer.",
    parameters: [],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              credential: {
                type: "string",
                description: "Email or mobile is required",
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

const updateVendorDoc = {
  patch: {
    tags: ["Vendor"],
    summary: "Update vendor by ID",
    description: "Endpoint to update an existing vendor by their ID.",
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
        description: "ID of the vendor to update",
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
            },
          },
        },
      },
    },
    responses: swaggerResponse,
  },
};

const approveVendorDoc = {
  put: {
    tags: ["Vendor"],
    summary: "Approve vendor request",
    description: "Endpoint to approve vendor request.",
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
        description: "ID of vendor",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};

const rejectVendorRequestDoc = {
  delete: {
    tags: ["Vendor"],
    summary: "Reject Vendor Request",
    description: "Endpoint to reject vendor request.",
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
        description: "ID of the vendor reject request",
        schema: {
          type: "string",
        },
      },
    ],
    requestBody: {},
    responses: swaggerResponse,
  },
};
const fetchUserDetailsDoc = {
  get: {
    tags: ["Customer"],
    summary: "Fetch customer details",
    description: "Endpoint to get Customer details",
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
module.exports = {
  createUserDoc,
  sendOtpDoc,
  sendVendorOtpDoc,
  createVendorDoc,
  vendorLoginDoc,
  customerLoginDoc,
  updateCustomerDoc,
  updateVendorDoc,
  approveVendorDoc,
  rejectVendorRequestDoc,
  fetchUserDetailsDoc,
};
