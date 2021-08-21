const botaoDark = document.querySelector('.modoDark');
const root = document.querySelector(':root');
const textGap = document.querySelector('#setTheme');
const icon = document.querySelector('.icon');
let theme = "main";


const themes = [
    {
        name:"main",
        pallet: [
            {
                key:"--main",
                value:"rgb(219, 219, 219)"
            },
            {
                key:"--secondary",
                value:"rgb(1, 100, 146)"
            },
            {
                key:"--accent",
                value:"rgb(241, 241, 241)"
            },
            {
                key:"--body",
                value:"rgb(71, 71, 71)"
            },
            {
                key:"--sky",
                value:"rgb(107, 166, 255)"
            },
            {
                key:"--icon",
                value:"rgb(251, 255, 0)"
            }
        ]
    },
    { 
        name:"dark",
        pallet: [
        {
            key:"--main",
            value:"rgb(32, 30, 30)"
        },
        {
            key:"--secondary",
            value:"rgb(243, 188, 32)"
        },
        {
            key:"--accent",
            value:"rgb(52, 49, 49)"
        },
        {
            key:"--body",
            value:"rgb(220, 220, 220)"
        },
        {
            key:"--sky",
            value:"rgb(42, 29, 75)"
        },
        {
            key:"--icon",
            value:"rgb(254, 255, 196)"
        }
    ]
    }
]
 
const defaultMode = () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const alterTheme = () => {
    if (theme =="main") {
        theme ="dark"
        document.querySelector('#darkText').innerHTML = 'Desabilitar o modo escuro'
        textGap.style.setProperty("gap",".95rem")
        icon.style.setProperty("transform","translateX(2rem)")
        return
    } 
    theme = "main"
    document.querySelector('#darkText').innerHTML = 'Habilitar o modo escuro'
    textGap.style.setProperty("gap","2rem")
    icon.style.setProperty("transform","translateX(0)")
}

const alterRoot = () => {
    alterTheme()
    const found = themes.find(t => t.name === theme)
    for(let t of found.pallet) {
        root.style.setProperty(t.key,t.value)
    }
}



botaoDark.addEventListener('click',alterRoot)
window.onload=setTimeout(() => {
    if(defaultMode()) {
        alterRoot()
    }},300)
