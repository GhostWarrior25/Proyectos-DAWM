window.addEventListener("DOMContentLoaded", (event) => {
  let urlPiloto = "datos/pilotos.json";
  let urlCircuito = "http://ergast.com/api/f1/2020.json";
  fetch(urlPiloto)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.MRData.DriverTable.Drivers.length; i++) {
        let piloto = data.MRData.DriverTable.Drivers[i];
        document.getElementById(
          "select-piloto"
        ).innerHTML += `<option value="${piloto.driverId}">${piloto.givenName} ${piloto.familyName}</option>`;
      }
    });
  fetch(urlCircuito)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.MRData.RaceTable.Races[0].raceName);
      for (let i = 0; i < data.MRData.RaceTable.Races.length; i++) {
        let circuito = data.MRData.RaceTable.Races[i].raceName;
        document.getElementById(
          "select-circuito"
        ).innerHTML += `<option value="${circuito}">${circuito}</option>`;
      }
    });
});
const seleccionPiloto = document.getElementById("select-piloto");
seleccionPiloto.addEventListener("change", function () {
  let piloto = seleccionPiloto.value;
  console.log(piloto);
  let urlPiloto =
    "http://ergast.com/api/f1/2020/drivers/" + piloto + "/results.json";
  fetch(urlPiloto)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.MRData.RaceTable.Races.length);
      if (data.MRData.RaceTable.Races.length > 0) {
        if (document.getElementsByClassName("container-tabla").length > 0) {
          document.getElementsByClassName("container-tabla")[0].innerHTML = "";
        }
        let tablaPosiciones = document.createElement("table");
        tablaPosiciones.innerHTML = `<tr><th>Fecha</th><th>Premio</th><th>Circuito</th><th>Escuderia</th><th>Posicion Inicial</th><th>Posicion Llegada</th></tr>`;
        document
          .getElementsByClassName("container-tabla")[0]
          .appendChild(tablaPosiciones);
        console.log(document.getElementsByClassName("container-tabla"));
        for (var i = 0; i < data.MRData.RaceTable.Races.length; i++) {
          let carrera = data.MRData.RaceTable.Races[i];
          console.log(carrera["Results"][i]);
          console.log(carrera);
          let premio = carrera.raceName;
          let fecha = carrera.round;
          let circuito = carrera.Circuit.circuitName;
          let escuderiaNombre = carrera.Results[0].Constructor.name;
          let salida = carrera.Results[0].grid;
          let posicion = carrera.Results[0].position;
            llenarTabla(fecha, premio, circuito, escuderiaNombre, salida, posicion,tablaPosiciones);
        }
      }
      else{
        document.getElementsByClassName("container-tabla")[0].innerHTML = "No hay datos para este piloto";
      }
    });
});

let llenarTabla = (fecha, premio, circuito, escuderia, salida, posicion,tabla) => {
    tabla.innerHTML += `<tr><td>${fecha}</td><td>${premio}</td><td>${circuito}</td><td>${escuderia}</td><td>${salida}</td><td>${posicion}</td></tr>`;
    }
