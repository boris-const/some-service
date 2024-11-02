class ProcessENV {
    
    public REACT_APP_BACK_URL = 'https://....';
  }
  
  let processENV: ProcessENV | null = null;
  
  export function getProcessEnv(): ProcessENV {
    if (processENV === null) {
      processENV = new ProcessENV();
    }
  
    if (typeof process.env.REACT_APP_BACK_URL === 'string') {
      processENV.REACT_APP_BACK_URL = process.env.REACT_APP_BACK_URL;
    }
  
    return processENV;
  }
  
  