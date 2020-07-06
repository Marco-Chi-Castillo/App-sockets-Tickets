const fs = require('fs');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;


  }

}

class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4Tickets = [];

    let data = require('../data/data.json');

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4Tickets = data.ultimos4Tickets;
    } else {
      this.reiniciarConteo();
    }
  }

  siguienteTicket() {
    this.ultimo += 1;
    let ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);

    this.grabarArchivo();
    return `Ticket ${this.ultimo}`
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`
  }

  getUltimos4() {
    return this.ultimos4Tickets;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return 'Ya no hay tickets por atender';
    }

    let numeroTicket = this.tickets[0].numero;
    this.tickets.shift();

    let atenderTicket = new Ticket(numeroTicket, escritorio);
    this.ultimos4Tickets.unshift(atenderTicket);

    if (this.ultimos4Tickets.length > 4) {
      this.ultimos4Tickets.splice(-1, 1); //borra el ultimo elemento del arreglo.
    }

    console.log(this.ultimos4Tickets);

    this.grabarArchivo();
    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4Tickets = [];
    console.log('Se ha inicializado el Sistema de Tickets');
    this.grabarArchivo();
  }

  grabarArchivo() {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4Tickets: this.ultimos4Tickets
    }

    let jsonDataString = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataString);
  }
}

module.exports = {
  TicketControl
}