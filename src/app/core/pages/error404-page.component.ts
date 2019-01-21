import { Component } from '@angular/core';

const html = `
<div id="notfound" class="error404-content">
		<div class="notfound">
			<div class="notfound-404">
				<h3>Oops! Página não Encontrada</h3>
				<h1><span>4</span><span>0</span><span>4</span></h1>
			</div>
            <h2>Pedimos desculpas mas o caminho não foi encontrado ou não existe.</h2>
            <p>Você pode <a href="" ng-click="back()">voltar</a> ou seguir para <a href="#">home</a>.</p>
		</div>
	</div>
`;

const styles = `

@media screen and (max-width: 768px){
    .error404-content{
        margin-top: 130px !important; 
        width: 100%;
    }
  }
  .error404-content {
    margin-top: 60px !important; 
    text-align: center;
  } 

#notfound {
    position: relative;
    height: 100vh;
  }
  
  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }
  
  .notfound {
    max-width: 520px;
    width: 100%;
    line-height: 1.4;
    text-align: center;
  }
  
  .notfound .notfound-404 {
    position: relative;
    height: 240px;
  }
  
  .notfound .notfound-404 h1 {
    font-family: 'Montserrat', sans-serif;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
    font-size: 252px;
    font-weight: 900;
    margin: 0px;
    color: #ce8808;
    text-transform: uppercase;
    letter-spacing: -40px;
    margin-left: -20px;
  }
  
  .notfound .notfound-404 h1>span {
    text-shadow: -8px 0px 0px #fff;
  }
  
  .notfound .notfound-404 h3 {
    font-family: 'Cabin', sans-serif;
    position: relative;
    font-size: 16px;
    font-weight: 700;
    text-transform: uppercase;
    color: #262626;
    margin: 0px;
    letter-spacing: 3px;
    padding-left: 6px;
  }
  
  .notfound h2 {
    font-family: 'Cabin', sans-serif;
    font-size: 20px;
    font-weight: 400;
    text-transform: uppercase;
    color: #bb4500;
    margin-top: 0px;
    margin-bottom: 25px;
  }
  
  @media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      height: 200px;
    }
    .notfound .notfound-404 h1 {
      font-size: 200px;
    }
  }
  
  @media only screen and (max-width: 480px) {
    .notfound .notfound-404 {
      height: 162px;
    }
    .notfound .notfound-404 h1 {
      font-size: 162px;
      height: 150px;
      line-height: 162px;
    }
    .notfound h2 {
      font-size: 16px;
    }
  }  
`

@Component({
  selector: 'app-news-page',
  template: html,
  styles: [styles]
})
export class Error404PageComponent {
}


