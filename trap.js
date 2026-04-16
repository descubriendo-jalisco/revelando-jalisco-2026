(function() {
    // Evitar que se ejecute doble si ya existe
    if (window.trapInitialized) return;
    window.trapInitialized = true;

    // Inject the CSS required for the popups
    const style = document.createElement('style');
    style.innerHTML = `
        /* FALSO POP-UP WINDOWS / INVASIVO */
        .invasive-popup {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%);
            width: 320px;
            background: #ece9d8;
            border: 2px outset #fff;
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.8);
            z-index: 99999 !important;
            pointer-events: auto;
            display: flex;
            flex-direction: column;
            animation: popIn 0.05s;
        }

        @keyframes popIn {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .popup-header {
            background: linear-gradient(90deg, #0a246a, #a6caf0);
            color: white;
            padding: 3px 5px;
            font-weight: bold;
            font-size: 0.8rem;
            display: flex;
            justify-content: space-between;
        }

        .popup-header-x {
            background: #d4d0c8;
            color: black;
            border: 1px outset #fff;
            width: 15px;
            text-align: center;
            line-height: 12px;
            cursor: pointer;
            font-family: sans-serif;
            font-size: 10px;
        }

        .popup-content {
            padding: 10px;
            background: #fff;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 2px inset #fff;
            margin: 5px;
        }

        .popup-content img {
            width: 100%;
            height: auto;
            border: 1px solid #333;
            margin-bottom: 5px;
        }

        .popup-content strong {
            color: red;
            font-size: 1rem;
            text-transform: uppercase;
        }

        .popup-content p {
            font-size: 0.75rem;
            text-align: center;
            margin-top: 5px;
            color: #111;
        }
    `;
    document.head.appendChild(style);

    const pageWrapper = document.getElementById('main-wrapper');

    // TRAMPA DEL BOTÓN DE RETROCESO (HISTORY HIJACK)
    window.history.pushState(null, "", window.location.href);
    window.addEventListener('popstate', function () {
        window.history.pushState(null, "", window.location.href);
        if (typeof invasionTriggered !== 'undefined' && invasionTriggered) {
            window.location.replace("404.html");
        } else {
            if (typeof startInvasion === 'function') startInvasion();
        }
    });

    // ANIMACIÓN DE TRANSICIÓN PARA LOS ENLACES OCULTOS
    document.querySelectorAll('.hidden-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.currentTarget.href;
            if (pageWrapper) pageWrapper.style.filter = `invert(100%) blur(2px)`;
            else document.body.style.filter = `invert(100%) blur(2px)`;
            setTimeout(() => {
                window.location.href = target;
            }, 200);
        });
    });

    // MECÁNICA INVASIVA: POP-UPS IN-PAGE
    window.invasionTriggered = false;
    let spamInterval;

    window.startInvasion = function() {
        if (window.invasionTriggered) return;
        window.invasionTriggered = true;

        document.body.style.overflow = 'hidden';

        if (pageWrapper) pageWrapper.style.filter = `contrast(1.5) sepia(80%) hue-rotate(-50deg)`;
        else document.body.style.filter = `contrast(1.5) sepia(80%) hue-rotate(-50deg)`;

        spamInterval = setInterval(createInvasivePopup, 200);

        for (let i = 0; i < 7; i++) {
            setTimeout(() => {
                try { window.open("404.html", "_blank"); } catch (e) { }
            }, i * 300);
        }

        document.addEventListener('click', () => {
            try { window.open("404.html", "_blank"); } catch (e) { }
        });
    };

    // O SI INTENTAN IRSE DE LA PÁGINA (Intent Exit pattern)
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 10) {
            window.startInvasion();
        }
    });

    window.addEventListener('beforeunload', function (e) {
        if (window.invasionTriggered) {
            window.startInvasion();
            e.preventDefault();
            e.returnValue = 'La autoridad no responde. ¿Seguro que quieres ignorarlo?';
        }
    });

    function createInvasivePopup() {
        if (document.querySelectorAll('.invasive-popup').length > 100) return;

        const popup = document.createElement('div');
        popup.className = 'invasive-popup';

        const maxW = window.innerWidth - 320;
        const maxH = window.innerHeight - 350;
        popup.style.left = Math.max(0, Math.random() * maxW) + 'px';
        popup.style.top = Math.max(0, Math.random() * maxH) + 'px';

        const names = ['FALTA', 'NO LOCALIZADO', 'TE BUSCAMOS', '¿DÓNDE ESTÁ?'];
        const title = names[Math.floor(Math.random() * names.length)];

        const rostros = ["2025-05-12_10-05-55___5231.jpg","648627111_1246262041013803_8297317130179219792_n.jpg","648846384_1246262254347115_2434366513526696399_n.jpg","648868937_1246262157680458_2157282201655388726_n.jpg","649004028_1246262111013796_1031282835328025993_n.jpg","649207603_1246545010985506_7760623263130861763_n.jpg","649306724_1246262074347133_4504007731657266713_n.jpg","650040835_1249388650701142_5395348799403467315_n.jpg","650405589_1246262201013787_4358337387668431775_n.jpg","650493852_1249571527349521_8464584031389805808_n.jpg","651337260_1249571534016187_4176019722741174170_n.jpg","651338085_1251736300466377_5611491718354951423_n.jpg","651789451_1251736343799706_444918620032060666_n.jpg","654416158_1251736387133035_919193265581663877_n.jpg","654454067_1253082086998465_6112736918488792879_n.jpg","655819701_1254062303567110_8631809173406458817_n.jpg","656049092_1256017163371624_6032628234729796442_n.jpg","656370356_1256973593275981_3125693357401308221_n.jpg","657147059_1255891506717523_9105608092486090074_n.jpg","657363582_1258508173122523_3589764569665638864_n.jpg","657391296_1257016913271649_5153178274897081698_n.jpg","657757491_1265077959132211_1266469452834767538_n.jpg","658067125_1257492149890792_3946804478719244466_n.jpg","658299010_1256896139950393_2228624025823818860_n.jpg","659781461_1265682895738384_1166042042178507052_n.jpg","659803304_1263492385957435_1624179715550530165_n.jpg","662185442_1267972192176121_1288433271818106011_n.jpg","662737815_1264107312562609_665347606293316777_n.jpg","666025890_1269690368670970_6262332453494140334_n.jpg","668015121_1269665292006811_780157773980767259_n.jpg","668140716_1268815348758472_6124204519113651413_n.jpg","668601559_1271396971833643_740981707464501674_n.jpg","668845086_1269665285340145_6367157077099565428_n.jpg","669066439_1268996315407042_2109766934174773792_n.jpg","669839669_1270282961945044_5765748394820582057_n.jpg","669847011_1269671478672859_8808988676393848493_n.jpg","670073739_1269788775327796_2247967230311262689_n.jpg","ABRAHAM-GOMEZ-MOSQUEDA.jpeg","BARTOLA-CASTANEDA-PEREZ.jpeg","BRENDA-BAUTISTA-PINEDA.jpeg","CARLOS-DANIEL-DOMINGUEZ-PEREZ.jpg","CESAR-AARON-ALARCON-RAMIREZ-2.jpeg","DARIEL-HAMMURABI-CONTRERAS-VARGAS.jpeg","desaparecida_-18-.png_340227010.webp","DULCE-VELAZQUEZ-PEREZ.jpeg","ELIAS-DE-JESUS-ORNELAS-TAPIA.jpeg","ESTRELLA-YEXALEN-RAMIREZ-GARCIA.jpeg","Ex_y3Y0WQAMFkws.jpg","Ex_y3YzXEAkhaKe.jpg","FABIAN-MELGAREJO-SOLIS.jpeg","IMG_3787-1068x586.jpeg","PEDRO-IVAN-VALENCIA-SANDOVAL.jpeg"];
        const randomRostro = rostros[Math.floor(Math.random() * rostros.length)];
        const imgSrc = "ROSTROS/" + randomRostro;

        popup.innerHTML = `
            <div class="popup-header">
                <span>ALERTA_SISTEMA_${Math.floor(Math.random() * 9999)}</span>
                <div class="popup-header-x">X</div>
            </div>
            <div class="popup-content">
                <img src="${imgSrc}" alt="Alerta" style="max-height: 400px; object-fit: contain;">
                <strong>${title}</strong>
                <p style="font-weight:bold; color:black; font-size:0.9rem;">No regresó a casa. La autoridad no da respuesta.</p>
            </div>
        `;

        popup.querySelector('.popup-header-x').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.target.closest('.invasive-popup').remove();
            createInvasivePopup();
            createInvasivePopup();
            createInvasivePopup();
            try { window.open("404.html", "ALERTA" + Math.random(), "width=400,height=400,left=" + (Math.random() * 500) + ",top=" + (Math.random() * 500)); } catch (e) { }
        });

        document.body.appendChild(popup);
    }
})();
