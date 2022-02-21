const actions = {
  GET_DATA_HELP_CHAIN_REQUEST: "GET_DATA_HELP_CHAIN_REQUEST",
  GET_DATA_HELP_CHAIN_SUCCESS: "GET_DATA_HELP_CHAIN_SUCCESS",

  GET_DATA_HELP_STORE_REQUEST: "GET_DATA_HELP_STORE_REQUEST",
  GET_DATA_HELP_STORE_SUCCESS: "GET_DATA_HELP_STORE_SUCCESS",

  GET_DATA_HELP_ERROR: "GET_DATA_HELP_ERROR",

  GET_FILE_REQUEST: "HELP/GET_FILE_REQUEST",
  GET_FILE_SUCCESS: "HELP/GET_FILE_SUCCESS",
  GET_FILE_ERROR: "HELP/GET_FILE_ERROR",

  getStoreData: (payload) => ({
    type: actions.GET_DATA_HELP_STORE_REQUEST,
    payload,
  }),

  getChainData: (payload) => ({
    type: actions.GET_DATA_HELP_CHAIN_REQUEST,
    payload,
  }),

  getFileRequest: () => ({
    type: actions.GET_FILE_REQUEST,
  }),
};

export default actions;
