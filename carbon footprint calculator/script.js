const FACTORS = {
  electricity_kwh_kg: 0.475,
  petrol_kg_per_l: 2.31,
  flight_kg_per_hour: 90
};

function calculate(){
  const elec = Number(document.getElementById('elec').value) || 0;
  const carKm = Number(document.getElementById('carKm').value) || 0;
  const carEff = Number(document.getElementById('carEff').value) || 1;
  const flights = Number(document.getElementById('flights').value) || 0;
  const dietIdx = Number(document.getElementById('diet').value) || 1.8;

  const elecAnnualKg = elec * 12 * FACTORS.electricity_kwh_kg;
  const annualKm = carKm * 52;
  const liters = annualKm / Math.max(carEff,0.1);
  const carKg = liters * FACTORS.petrol_kg_per_l;
  const flightsKg = flights * FACTORS.flight_kg_per_hour;
  const baselineOther = 2000 * dietIdx;

  const totalKg = Math.round((elecAnnualKg + carKg + flightsKg + baselineOther));
  document.getElementById('resultArea').textContent =
      totalKg.toLocaleString() + ' kg CO₂e / year';
}
