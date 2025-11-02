import { useState, useCallback } from "react";

const useAlert = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const showAlert = useCallback((message: string) => {
    setAlertMessage(message);
  }, []);

  const hideAlert = useCallback(() => {
    setAlertMessage(null);
  }, []);

  return { alertMessage, showAlert, hideAlert };
};

export default useAlert;
