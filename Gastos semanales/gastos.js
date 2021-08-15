let presupuestoSemanal = parseInt(prompt("¿Cuál es su presupuesto semanal?"));
localStorage.setItem("Presupuesto Inicial", presupuestoSemanal);
let presupuestoInicial = localStorage.getItem("Presupuesto Inicial");
console.log(`Presupuesto: ${presupuestoInicial}`);

function Tabla() {
    // variables 
    let restante = document.getElementById("restante"),
    presupuesto = document.getElementById("presupuesto"),
    btnAnadir = document.getElementById("btnAnadir"),
    gasto = document.getElementById("gasto"),
    cantidad = document.getElementById("cantidad");

    // Funciones 
    const dineroDisponible = () => {
        let presupuestoSemanal1 = document.createTextNode(`$ ${presupuestoSemanal}`),
        restantePorGasto = document.createTextNode(`$ ${presupuestoSemanal}`);
        presupuesto.appendChild(presupuestoSemanal1);
        restante.appendChild(restantePorGasto);

        // Funcion de lista
        let listaDeGastos = () => {
            if (cantidad.value == "" || gasto.value == "") {
                alert("Error: Valor Invalido");
            }
            else {
                let ol = document.getElementById("lista-gastos"),
                li = document.createElement("li"), 
                a = document.createElement("a"),
                lista = document.getElementById("lista"),
                gasto1 = gasto.value,
                cantidad1 = cantidad.value,
                content = document.createTextNode(`${gasto1}: $ ${cantidad1}`);
                lista.removeAttribute("style");
                lista.style.margin = "30px 20px 20px 20px";
                gasto.value = "";
                cantidad.value = "";
                li.appendChild(content);
                a.appendChild(li);
                ol.appendChild(a);
                let lista1 = {
                    Gasto: gasto1,
                    Cantidad: cantidad1
                };
                localStorage.setItem("lista", JSON.stringify(lista1));
                lista2 = localStorage.getItem("lista");
                console.log("Lista: " + lista2);

                // Local Storage
                localStorage.setItem("cantidad.value", cantidad1);
                let obtenerValor = localStorage.getItem("cantidad.value"),
                resta = parseInt(presupuestoSemanal) - parseInt(obtenerValor);
                localStorage.setItem("resta.value", resta);
                presupuestoSemanal = localStorage.getItem("resta.value")
                restante.removeChild(restantePorGasto);
                restantePorGasto = document.createTextNode(`$ ${resta}`);
                restante.appendChild(restantePorGasto);
                console.log(`Restante: ${presupuestoSemanal}`);
                if (presupuestoSemanal < 0) {
                    restante.setAttribute("class","restante2");
                }
                else if (presupuestoSemanal == 0) {
                    restante.setAttribute("class", "restante3");
                }

                // Borrar de lista
                for (i = 0; i <= a.children.length - 1; i++) {
                    a.children[i].addEventListener("click", function(){
                        this.parentNode.removeChild(this);
                        resta = parseInt(presupuestoSemanal) + parseInt(obtenerValor);
                        localStorage.setItem("resta.value", resta);
                        presupuestoSemanal = localStorage.getItem("resta.value")
                        restante.removeChild(restantePorGasto);
                        restantePorGasto = document.createTextNode(`$ ${resta}`);
                        restante.appendChild(restantePorGasto);
                        console.log(`Restante: ${presupuestoSemanal}`);
                        if (presupuestoSemanal == presupuestoInicial) {
                            lista.removeAttribute("style");
                            lista.style.visibility = "hidden";
                        }
                        if (resta > 0) {
                            restante.setAttribute("class", "restante");
                        }
                        else if (resta == 0) {
                            restante.setAttribute("class", "restante3");
                        }
                    });
                }
            }
        }
        // Eventos 
        btnAnadir.addEventListener("click", listaDeGastos);
        
    }
    dineroDisponible();   
}

Tabla();

