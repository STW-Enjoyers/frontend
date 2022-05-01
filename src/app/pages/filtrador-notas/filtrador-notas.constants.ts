export const TITLE_INPUT:string = "Ingresa la nota de corte máxima";
export const TEXT_AFTER_INPUT:string = "¿No sabes cuál es tu nota de corte? Simula tu nota de corte ";
export const TITLE_SELECT:string = "Condición especial";
export const PLACEHOLDER:string = "Inserta nota de corte límite";

// Special conditions
export const CUPOS = [
  {id:1, text:"Deportistas de alto nivel"},
  {id:2, text:"Deportistas de alto rendimiento"},
  {id:3, text:"Discapacidad"},
  {id:4, text:"General"},
  {id:5, text:"Mayores de 25 años"},
  {id:6, text:"Mayores de 40 años"},
  {id:7, text:"Mayores de 45 años"}
]

// Datatables options
export const DTOPTIONS = {
  search: true,
  dom:  '<<t>ip>',
  scrollX: true,
  scrollCollapse: true,
  order: [ 1, 'desc' ],
  columnDefs: [
    { // Handle Carreras column overflow
      "targets": 0,
      "width": "30%",
      render: function ( data: string) {
        return data.length > 70
          ? data.substr( 0, 70 ) + "..."
          : data
      }
    },
    {  // Handle cell padding (the only way that works)
      "targets": '_all',
      "createdCell": function (td: any) {
        $(td).css('padding', '15px')
      }
    }
  ],
  language: {
    zeroRecords: "No hemos encontrado ninguna carrera - disculpa",
    info: "Mostrando _TOTAL_ carreras",
    infoEmpty: "No hay carreras disponibles",
    infoFiltered: "",
    paginate: {
      first: "Primera página",
      last:"Última página",
      next:"Siguiente",
      previous: "Anterior"
    },
  }
}