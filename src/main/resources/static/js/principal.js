document.addEventListener("DOMContentLoaded", () => {
    const btnEnviar = document.getElementById("btnEnviar");
    const inputURL = document.querySelector("input[type='text']");
    const cards = document.getElementById("cardsContainer");

    function isValidURL(string) {
        try {
            new URL(string); // tenta criar um objeto URL
            return true;
        } catch (_) {
            return false;
        }
    }

    btnEnviar.addEventListener("click", () => {
        const url = inputURL.value.trim();

        // Validação
        if (!url || !isValidURL(url)) {
            alert("Por favor, insira uma URL válida.");
            return;
        }

        // Se chegou aqui, a URL é válida
        const confiabilidade = 87; // valor de exemplo

        cards.innerHTML = `
            <div class="flex flex-col items-center gap-4 sm:w-[60%]">
                <button id="btnVoltar" class="btn btn-soft rounded-2xl self-start bg-zinc-950">Voltar</button>
                <div id="progress" class="radial-progress" style="--value:0;" aria-valuenow="0" role="progressbar">0%</div>
                <p class="text-xl">A URL é confiável de acordo com tais verificações feitas e tal</p>
            </div>
        `;

        // Animação do progresso
        function animateProgress(finalValue, duration) {
            const progress = document.getElementById("progress");
            let start = 0;
            const stepTime = 1000 / 60;
            const increment = finalValue / (duration / stepTime);

            const interval = setInterval(() => {
                start += increment;
                if (start >= finalValue) {
                    start = finalValue;
                    clearInterval(interval);
                }
                progress.style.setProperty("--value", start);
                progress.setAttribute("aria-valuenow", Math.round(start));
                progress.textContent = Math.round(start) + "%";
            }, stepTime);
        }

        animateProgress(confiabilidade, 1000);

        // Botão de voltar
        document.getElementById("btnVoltar").addEventListener("click", () => {
            cards.innerHTML = `
                <div style="background-image: url('../img/card_1.webp'); background-size: cover;" 
                    class="btn flex justify-center items-center w-full sm:w-[30%] sm:h-full h-[50%] rounded-md p-2 bg-zinc-950 border-base-300 bg-black">
                    <h1>Verificar URL</h1>
                </div>
                <div style="background-image: url('../img/card_2.webp'); background-size: cover;" 
                    class="btn flex justify-center items-center w-full sm:w-[30%] sm:h-full h-[50%] rounded-md p-2 bg-zinc-950 border-base-300 bg-black">
                    <h1>Verificar Texto</h1>
                </div>
                <div style="background-image: url('../img/card_3.webp'); background-size: cover;" 
                    class="btn flex justify-center items-center w-full sm:w-[30%] sm:h-full h-[50%] rounded-md p-2 bg-zinc-950 border-base-300 bg-black">
                    <h1>Verificar Imagens</h1>
                </div>
            `;
        });
    });
});
