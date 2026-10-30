// Base de dados pronta
const dadosPesquisa = {
  mediaNacionalDiaria: 4, // Média de horas que o brasileiro passa nas redes
  alertaSaude: 6,         // Limite recomendado por especialistas
  sugestoes: [
    { limite: 2,  mensagem: "Parabéns! Seu uso está equilibrado. Você tem mais tempo livre para hobbies e descanso." },
    { limite: 5,  mensagem: "Atenção. Você está na média nacional, mas já gasta quase um dia inteiro da sua semana olhando para a tela." },
    { limite: 24, mensagem: "Cuidado! Seu uso é considerado muito alto. Isso pode afetar seu sono, foco e saúde mental. Que tal um detox digital?" }
  ]
};

const campoHoras = document.getElementById("horas");
const botao = document.getElementById("calcular");
const resultado = document.getElementById("resultado");

function mostrarErro(texto) {
  resultado.replaceChildren();
  const p = document.createElement("p");
  p.className = "erro";
  p.textContent = texto;
  resultado.appendChild(p);
}

function calcular() {
  const texto = campoHoras.value.trim();
  const horas = Number(texto);

  // Validação: vazio, não numérico, negativo ou mais que 24h/dia
  if (texto === "" || !Number.isFinite(horas)) {
    return mostrarErro("Digite um número válido de horas.");
  }
  if (horas < 0 || horas > 24) {
    return mostrarErro("Informe um valor entre 0 e 24 horas por dia.");
  }

  const semanal = horas * 7;
  const mensal = horas * 30;

  // Primeira faixa cujo limite comporta o valor digitado
  const faixa = dadosPesquisa.sugestoes.find(s => horas <= s.limite);
  const cor = horas <= dadosPesquisa.sugestoes[0].limite ? "verde"
            : horas <= dadosPesquisa.alertaSaude ? "amarelo"
            : "vermelho";

  let comparacao;
  if (horas > dadosPesquisa.mediaNacionalDiaria) {
    comparacao = `Isso é mais do que a média nacional de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
  } else if (horas < dadosPesquisa.mediaNacionalDiaria) {
    comparacao = `Isso é menos do que a média nacional de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
  } else {
    comparacao = `Isso é igual à média nacional de ${dadosPesquisa.mediaNacionalDiaria} horas por dia.`;
  }

  const numeros = document.createElement("p");
  numeros.className = "numeros";
  numeros.textContent =
    `Você passa ${semanal} horas por semana e ${mensal} horas por mês nas redes sociais. ${comparacao}`;

  const veredito = document.createElement("p");
  veredito.className = `veredito ${cor}`;
  veredito.textContent = faixa.mensagem;

  resultado.replaceChildren(numeros, veredito);
}

botao.addEventListener("click", calcular);
campoHoras.addEventListener("keydown", e => { if (e.key === "Enter") calcular(); });
