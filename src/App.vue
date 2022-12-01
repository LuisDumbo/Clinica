<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light menucolor">
      <a class="navbar-brand" href="#">Somos Nós</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item ">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>

          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Paceinte
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/paciente">Cadastar Paciente</router-link>
              <router-link class="dropdown-item" to="/listarPacinte">Listar Paciente</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              Medico
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/medico">Cadastar Medico</router-link>
              <router-link class="dropdown-item" to="/listar_medico">Listar Medico</router-link>
            </div>
          </li>
        </ul>
      </div>
    </nav>

    <router-view class="container" id="tamanhoContainer" style="margin-top: 30px" />

  </div>
</template>

<style>
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: #42b983;
  color: #42b983;
}

.menucolor {
  background: #00a8e1 !important;
}


.spinner {
  margin: auto;
  margin-top: 50px;
  width: 11.2px;
  height: 11.2px;
  animation: spinner-z355kx 1s infinite linear;
  border-radius: 11.2px;
  box-shadow: 28px 0px 0 0 #474bff, 17.4px 21.8px 0 0 #474bff, -6.2px 27.2px 0 0 #474bff, -25.2px 12px 0 0 #474bff, -25.2px -12px 0 0 #474bff, -6.2px -27.2px 0 0 #474bff, 17.4px -21.8px 0 0 #474bff;
}

@keyframes spinner-z355kx {
  to {
    transform: rotate(360deg);
  }
}
</style>
