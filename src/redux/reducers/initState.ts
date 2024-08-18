const context = {
  data: {},
  errors: null,
  loading: false,
};

export default {
  payload: {
    thought: context,
    vote: context,
    thoughts: {
      ...context,
      data: [],
    },
  },
  thoughtpayload: {
    name: "",
    description: "",
  },
  errors: {
    name: false,
    description: false,
  },
  errorMessages: {
    name: "",
    description: "",
  },
};
