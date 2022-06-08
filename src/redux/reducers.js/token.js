const initialState = {
  tokenDefault:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImV4cCI6MTY1NTMwMjYxOX0.ew9uFPy841ZHS1uh2ogjMvo00lip-WTAQ1kNAEQ8Erc",
  rememberMe: localStorage.getItem("isChecked")
    ? JSON.parse(localStorage.getItem("isChecked"))
    : false,
  reRenderUser: 0,
  emailForgot: "",
  codeForgot: "",
  totalCart: 0,
  codeVoucher: "",
};

const token = (state = initialState, action) => {
  switch (action.type) {
    case "toogle-remember":
      const isChecked = !state.rememberMe;
      localStorage.setItem("isChecked", JSON.stringify(isChecked));
      return {
        ...state,
        rememberMe: isChecked,
      };
    case "re-render":
      return {
        ...state,
        reRenderUser: action.payload,
      };
    case "add-email":
      return {
        ...state,
        emailForgot: action.payload,
      };
    case "add-code":
      return {
        ...state,
        codeForgot: action.payload,
      };
    case "add-total-cart":
      return {
        ...state,
        totalCart: action.payload,
      };
    case "add-code-voucher":
      return {
        ...state,
        codeVoucher: action.payload,
      };
    default:
      return state;
  }
};

export default token;
