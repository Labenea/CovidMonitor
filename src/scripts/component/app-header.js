class AppHeader extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="jumbotron mb-0 bg-transparent
      jumbotron-fluid">
      <div class="container">
        <h1 class="text-torq text-center display-4 ">COVID-19 Tracker</h1>
        <p class="text-white text-center ">Data Source From <span><a class="link-color" href="https://github.com/mathdroid/covid-19-api"> Mathdroid</a> </span> API</p>
      </div>
    </div>
      `;
  }
}

customElements.define("app-header", AppHeader);
