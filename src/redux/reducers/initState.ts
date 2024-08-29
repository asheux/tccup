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
    upload: context,
    trashdetect: context,
    blockchain: context,
    blocks: {
      ...context,
      data: [],
    },
  },
  thoughtpayload: {
    name: "",
    description: "",
    link: "",
  },
  errors: {
    name: false,
    description: false,
    link: false,
  },
  errorMessages: {
    name: "",
    description: "",
    link: "",
  },
};
