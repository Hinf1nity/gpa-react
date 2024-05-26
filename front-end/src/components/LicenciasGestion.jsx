import { useEffect, useState } from "react";
import { getLicencias } from "../api/tasks.api";
import { LicenciasCard } from "./LicenciasCard";

export function LicenciasGestion() {
  const [licencias, setLicencias] = useState([]);

  const fetchLicencias = async () => {
    try {
      const response = await getLicencias();
      setLicencias(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchLicencias();
  }, []);
  return (
    <div>
      <h1>Licencias</h1>
      <LicenciasCard licencias={licencias} />
    </div>
  );
}
