"use strict";
window.AETHER_MAPS = {
  "shadows-of-evil": {
    "id": "shadows-of-evil",
    "file": "Arquivo 01 — SOE",
    "title": "Shadows of Evil",
    "location": "Morg City",
    "image": "assets/images/maps/shadows-of-evil-canal.webp",
    "theme": {
      "primary": "#b988e2",
      "primaryLight": "#dfc0ff",
      "primaryDark": "#2b1839",
      "glow": "rgba(185, 136, 226, 0.34)"
    },
    "introduction": "Morg City esconde seus segredos atrás de neon, chuva e rituais. Investigue os distritos e alterne entre o mundo comum e o Beast Mode.",
    "status": "Dossiê interativo disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Nero, Jessica, Jack e Floyd"
      },
      {
        "label": "Identidade",
        "value": "Noir sobrenatural"
      },
      {
        "label": "Interação",
        "value": "Beast Mode e distritos"
      },
      {
        "label": "Objetivo",
        "value": "Rituais e acesso ao local sagrado"
      }
    ],
    "story": [
      "Quatro habitantes de Morg City são atraídos para uma sequência de acontecimentos sobrenaturais depois de cometerem atos dos quais tentavam escapar.",
      "O Shadowman conduz o grupo por rituais que parecem oferecer uma saída, mas cada avanço revela que a cidade faz parte de um conflito muito maior.",
      "O mapa apresenta o universo Apothicon e conecta seu desfecho aos acontecimentos que seguem em Black Ops III Zombies."
    ],
    "characters": [
      {
        "name": "Nero Blackstone",
        "role": "O mágico",
        "summary": "Um artista em decadência ligado ao ritual de Easy Street.",
        "code": "NB",
        "image": "assets/images/shadows-of-evil/characters/nero-blackstone.webp",
        "imagePosition": "center top"
      },
      {
        "name": "Jessica Rose",
        "role": "A dançarina",
        "summary": "Busca preservar a própria carreira enquanto é perseguida por suas escolhas.",
        "code": "JR",
        "image": "assets/images/shadows-of-evil/characters/jessica-rose.webp",
        "imagePosition": "center top"
      },
      {
        "name": "Jack Vincent",
        "role": "O policial",
        "summary": "Um detetive corrupto ligado aos segredos do Canal District.",
        "code": "JV",
        "image": "assets/images/shadows-of-evil/characters/jack-vincent.webp",
        "imagePosition": "center top"
      },
      {
        "name": "Floyd Campbell",
        "role": "O boxeador",
        "summary": "Um lutador determinado a conquistar a grande oportunidade de sua vida.",
        "code": "FC",
        "image": "assets/images/shadows-of-evil/characters/floyd-campbell.webp",
        "imagePosition": "center top"
      }
    ],
    "mechanics": [
      {
        "title": "Beast Mode",
        "summary": "Uma forma temporária usada para energizar, abrir e revelar elementos.",
        "details": "O Beast Mode transforma a exploração em um quebra-cabeça de rota: cada ativação precisa ser aproveitada para alcançar interruptores, caixas e passagens antes do tempo acabar."
      },
      {
        "title": "Rituais",
        "summary": "Cada distrito possui um objeto e um local de ritual.",
        "details": "A progressão central liga os quatro personagens aos seus respectivos distritos. Completar os rituais abre o caminho para a etapa seguinte do mapa."
      },
      {
        "title": "Bonde",
        "summary": "O transporte conecta os distritos e revela símbolos importantes.",
        "details": "Além de reduzir o caminho entre áreas, o bonde serve como ponto de observação para informações usadas em uma etapa posterior."
      },
      {
        "title": "Apothicon Sword",
        "summary": "Uma arma especial ligada aos ovos e aos símbolos da cidade.",
        "details": "A espada oferece uma progressão própria e reforça o tema ritualístico de Morg City sem expor todo o processo de uma vez."
      }
    ],
    "quest": [
      {
        "title": "Obter a Summoning Key",
        "description": "Abra a área inicial e recupere a chave usada nos rituais."
      },
      {
        "title": "Encontrar os quatro objetos",
        "description": "Associe cada objeto ao personagem e ao distrito correspondente."
      },
      {
        "title": "Completar os rituais",
        "description": "Realize os quatro rituais e reúna os Gateworms."
      },
      {
        "title": "Abrir o local sagrado",
        "description": "Use os Gateworms para acessar a área subterrânea."
      },
      {
        "title": "Preparar o grupo",
        "description": "Organize armas, vantagens e equipamentos antes das etapas finais."
      },
      {
        "title": "Concluir a etapa final",
        "description": "Coordene as ações finais do grupo para completar o arquivo principal."
      }
    ],
    "secrets": [
      {
        "title": "Símbolos do bonde",
        "description": "Um registro visual que pode ser desbloqueado ao visitar os três distritos."
      },
      {
        "title": "Canção secreta",
        "description": "O arquivo musical fica disponível depois de investigar os pontos associados."
      },
      {
        "title": "Arquivo Apothicon",
        "description": "Um resumo das ligações entre os símbolos, a espada e a presença do Shadowman."
      }
    ],
    "interaction": {
      "type": "beast",
      "title": "Operação Beast Mode",
      "description": "Conclua uma rota curta em cada distrito, obtenha os quatro Gateworms e abra o Local Sagrado.",
      "duration": 12,
      "districts": [
        {
          "name": "Easy Street",
          "code": "ES",
          "character": "Nero Blackstone",
          "object": "Caneta do produtor",
          "ritual": "Nero’s Landing",
          "note": "A primeira rota ensina a alternar entre força, eletricidade e mobilidade do Beast Mode.",
          "tasks": [
            {
              "label": "Romper o selo da Summoning Key",
              "verb": "Romper selo"
            },
            {
              "label": "Energizar o guindaste da caneta",
              "verb": "Energizar guindaste"
            },
            {
              "label": "Abrir o acesso ao ritual de Nero",
              "verb": "Abrir passagem"
            }
          ],
          "image": "assets/images/shadows/ritual-easy-street.webp"
        },
        {
          "name": "Canal District",
          "code": "CD",
          "character": "Jack Vincent",
          "object": "Distintivo do detetive",
          "ritual": "Ruby Rabbit",
          "note": "Os canais exigem uma rota precisa entre a caixa do objeto, o painel elétrico e o prédio do ritual.",
          "tasks": [
            {
              "label": "Quebrar a caixa do distintivo",
              "verb": "Quebrar caixa"
            },
            {
              "label": "Energizar a escadaria do canal",
              "verb": "Ativar escadaria"
            },
            {
              "label": "Abrir o acesso ao Ruby Rabbit",
              "verb": "Abrir ritual"
            }
          ],
          "image": "assets/images/shadows/ritual-canal.webp"
        },
        {
          "name": "Footlight District",
          "code": "FD",
          "character": "Jessica Rose",
          "object": "Peruca da dançarina",
          "ritual": "Black Lace Burlesque",
          "note": "A rota de Footlight usa pontos elevados para alcançar o objeto e liberar o interior do teatro.",
          "tasks": [
            {
              "label": "Usar o ponto de grapple do teatro",
              "verb": "Usar grapple"
            },
            {
              "label": "Energizar a escadaria de Footlight",
              "verb": "Ativar escadaria"
            },
            {
              "label": "Romper a caixa da peruca",
              "verb": "Romper caixa"
            }
          ],
          "image": "assets/images/shadows/ritual-footlight.webp"
        },
        {
          "name": "Waterfront District",
          "code": "WD",
          "character": "Floyd Campbell",
          "object": "Cinturão do boxeador",
          "ritual": "Boxing Gym",
          "note": "O cais combina acesso vertical, energia e força para abrir o ginásio e recuperar o cinturão.",
          "tasks": [
            {
              "label": "Alcançar o acesso superior do ginásio",
              "verb": "Subir ao ginásio"
            },
            {
              "label": "Energizar a entrada do Boxing Gym",
              "verb": "Ativar entrada"
            },
            {
              "label": "Romper a caixa do cinturão",
              "verb": "Romper caixa"
            }
          ],
          "image": "assets/images/maps/shadows-of-evil-canal.webp"
        }
      ],
      "finale": {
        "name": "Local Sagrado",
        "code": "RIFT",
        "title": "Abra o coração de Morg City",
        "description": "Posicione os quatro Gateworms nos altares e conclua o ritual que revela o portal do Pack-a-Punch.",
        "rewardTitle": "Arquivo Mestre de Morg City",
        "rewardDescription": "A cidade muda de estado, o portal permanece aberto e um conjunto especial de registros fica disponível.",
        "rewards": [
          {
            "label": "Registro desbloqueado",
            "value": "Dossiê do Shadowman"
          },
          {
            "label": "Sistema revelado",
            "value": "Os quatro rituais"
          },
          {
            "label": "Arquivo especial",
            "value": "Apothicon Servant"
          },
          {
            "label": "Selo permanente",
            "value": "Morg City investigada"
          }
        ]
      }
    },
    "welcome": "Morg City reconheceu sua presença.",
    "directive": "Complete as quatro rotas do Beast Mode, recupere os Gateworms e abra o Local Sagrado para transformar permanentemente o arquivo.",
    "presence": {
      "name": "Shadowman",
      "subtitle": "Guia sombrio",
      "description": "A entidade que manipula os quatro protagonistas conduz a experiência por meio de rituais, visões e promessas de redenção.",
      "motif": "ritual",
      "image": "assets/images/shadows-of-evil/characters/shadowman-floating.png",
      "imageAlt": "Shadowman em sua forma transformada, flutuando sobre fumaça roxa."
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Noir sobrenatural",
        "description": "Neon, chuva e becos fazem de Shadows uma mistura de cidade criminal com horror cósmico."
      },
      {
        "label": "Por que clicar",
        "title": "Cada distrito tem função",
        "description": "Canal, Footlight e Waterfront existem para ensinar rotas, abrir segredos e dar propósito ao Beast Mode."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Apothicon Servant e Sword",
        "description": "A wonder weapon e a espada reforçam a identidade ritualística e dão ao mapa um arsenal muito próprio."
      }
    ],
    "arsenal": [
      {
        "type": "Wonder Weapon",
        "name": "Apothicon Servant",
        "description": "Arma viva que cria um vórtice capaz de sugar grupos de zumbis."
      },
      {
        "type": "Equipamento especial",
        "name": "Apothicon Sword",
        "description": "Espada ritualística ligada ao progresso dos ovos e aos símbolos da cidade."
      },
      {
        "type": "Mecânica central",
        "name": "Beast Mode",
        "description": "Forma temporária usada para energizar, abrir passagens e enxergar segredos.",
        "image": "assets/images/shadows-of-evil/enemies/beast-mode.webp",
        "imagePosition": "center"
      }
    ],
    "soundtrack": [
      {
        "title": "Snakeskin Boots",
        "note": "Canção secreta que combina com a atmosfera decadente de Morg City."
      },
      {
        "title": "Tema de Morg City",
        "note": "Base musical com jazz sombrio, ruído urbano e tensão constante."
      },
      {
        "title": "Clima Apothicon",
        "note": "A trilha cresce quando o mapa expõe seus lados ritualísticos e cósmicos."
      }
    ]
  },
  "the-giant": {
    "id": "the-giant",
    "file": "Arquivo 02 — 935",
    "title": "The Giant",
    "location": "Instalação do Grupo 935",
    "image": "assets/images/maps/the-giant.jpg",
    "theme": {
      "primary": "#f28a30",
      "primaryLight": "#ffc078",
      "primaryDark": "#3a1f0f",
      "glow": "rgba(242, 138, 48, 0.3)"
    },
    "introduction": "Uma instalação conhecida retorna em uma linha temporal alterada. Reative seus sistemas e abra os registros do Grupo 935.",
    "status": "Painel de teleporte disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Primis"
      },
      {
        "label": "Identidade",
        "value": "Instalação industrial"
      },
      {
        "label": "Interação",
        "value": "Teletransportadores"
      },
      {
        "label": "Objetivo",
        "value": "Sincronizar os sistemas"
      }
    ],
    "story": [
      "Primis chega à instalação em um momento decisivo e altera o destino de uma versão anterior de Richtofen.",
      "O local preserva experimentos, mensagens e equipamentos do Grupo 935, mas agora funciona como uma ponte entre diferentes versões da história.",
      "A escala menor do mapa favorece exploração direta, domínio de rotas e leitura dos registros espalhados pelo laboratório."
    ],
    "characters": [
      {
        "name": "Edward Richtofen",
        "role": "Cientista",
        "summary": "Conduz o grupo por uma missão que depende de versões diferentes de si mesmo.",
        "code": "ER"
      },
      {
        "name": "Tank Dempsey",
        "role": "Soldado",
        "summary": "Mantém o foco militar da equipe enquanto questiona o plano de Richtofen.",
        "code": "TD"
      },
      {
        "name": "Takeo Masaki",
        "role": "Guerreiro",
        "summary": "Observa a missão pela ótica da honra e do dever.",
        "code": "TM"
      },
      {
        "name": "Nikolai Belinski",
        "role": "Soldado",
        "summary": "Combina humor e desconfiança durante o avanço pela instalação.",
        "code": "NB"
      }
    ],
    "mechanics": [
      {
        "title": "Energia",
        "summary": "O painel central libera o funcionamento da instalação.",
        "details": "A ativação da energia reorganiza a exploração e permite iniciar a sincronização dos teletransportadores."
      },
      {
        "title": "Teletransportadores",
        "summary": "Três estações precisam ser conectadas ao sistema principal.",
        "details": "Cada estação concluída representa uma etapa visível do progresso e abre uma leitura mais clara da instalação."
      },
      {
        "title": "Arsenal",
        "summary": "O mapa oferece uma progressão rápida de equipamentos.",
        "details": "A experiência favorece decisões diretas de rota, posicionamento e preparação em um espaço compacto."
      }
    ],
    "quest": [
      {
        "title": "Ligar a energia",
        "description": "Reative o painel principal da instalação."
      },
      {
        "title": "Sincronizar o teleporte A",
        "description": "Conecte a primeira estação ao sistema central."
      },
      {
        "title": "Sincronizar o teleporte B",
        "description": "Conecte a segunda estação ao sistema central."
      },
      {
        "title": "Sincronizar o teleporte C",
        "description": "Conecte a terceira estação ao sistema central."
      },
      {
        "title": "Investigar os registros",
        "description": "Abra os arquivos revelados após a sincronização."
      }
    ],
    "secrets": [
      {
        "title": "Rádios do Grupo 935",
        "description": "Mensagens de diferentes momentos ampliam o contexto da instalação."
      },
      {
        "title": "Objetos ocultos",
        "description": "Pequenos itens espalhados pelo mapa ativam um arquivo adicional."
      },
      {
        "title": "Arquivo Primis",
        "description": "Uma comparação curta entre a equipe presente e suas versões anteriores."
      }
    ],
    "interaction": {
      "type": "teleporters",
      "title": "Rede de teletransportadores",
      "description": "Ative as três estações para restaurar o sistema central.",
      "stations": [
        {
          "name": "Teleporte A",
          "sector": "Laboratório",
          "record": "Registro de pesquisa"
        },
        {
          "name": "Teleporte B",
          "sector": "Pátio",
          "record": "Registro militar"
        },
        {
          "name": "Teleporte C",
          "sector": "Depósito",
          "record": "Registro dimensional"
        }
      ]
    },
    "welcome": "Arquivo Der Riese reaberto. Energia instável detectada nos setores do Grupo 935.",
    "directive": "Reative a rede de teleporte, estabilize a instalação e acompanhe o ponto de partida da jornada de Primis em BO3.",
    "presence": {
      "name": "Dr. Edward Richtofen",
      "subtitle": "Operador Primis",
      "description": "The Giant gira em torno da decisão que altera o curso dos eventos e reposiciona Richtofen como eixo do plano.",
      "motif": "energia"
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Retorno a Der Riese",
        "description": "O mapa funciona como um reencontro com um espaço clássico, agora com visual mais agressivo e importância narrativa imediata."
      },
      {
        "label": "Por que clicar",
        "title": "Rede de teleporte",
        "description": "Cada estação concluída empurra o arquivo adiante e reforça a sensação de reativar a instalação."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Mudança decisiva na história",
        "description": "The Giant é curto, mas essencial: ele redefine a trajetória da equipe Primis."
      }
    ],
    "arsenal": [
      {
        "type": "Wonder Weapon",
        "name": "Wunderwaffe DG-2",
        "description": "Arma elétrica clássica, ligada à identidade de Der Riese e The Giant."
      },
      {
        "type": "Utilitário",
        "name": "Teletransportadores",
        "description": "Além da movimentação, servem como espinha dorsal do progresso do mapa."
      },
      {
        "type": "Equipe",
        "name": "Primis",
        "description": "Richtofen, Dempsey, Takeo e Nikolai reassumem o foco da jornada."
      }
    ],
    "soundtrack": [
      {
        "title": "Beauty of Annihilation (legado)",
        "note": "Referência sonora marcante da instalação original e do imaginário de Der Riese."
      },
      {
        "title": "Ruído industrial",
        "note": "Máquinas, eletricidade e sirenes criam a identidade sonora do mapa."
      },
      {
        "title": "Tensão 935",
        "note": "A trilha sustenta o clima de laboratório fora de controle."
      }
    ]
  },
  "der-eisendrache": {
    "id": "der-eisendrache",
    "file": "Arquivo 03 — DE",
    "title": "Der Eisendrache",
    "location": "Áustria",
    "image": "assets/images/maps/der-eisendrache.jpg",
    "theme": {
      "primary": "#56b8ff",
      "primaryLight": "#b8e4ff",
      "primaryDark": "#102a3d",
      "glow": "rgba(86, 184, 255, 0.3)"
    },
    "introduction": "Um castelo medieval abriga tecnologia, dragões e quatro caminhos elementais. Selecione um arco e acompanhe sua evolução.",
    "status": "Forja dos arcos disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Primis"
      },
      {
        "label": "Identidade",
        "value": "Castelo e tecnologia"
      },
      {
        "label": "Interação",
        "value": "Quatro arcos"
      },
      {
        "label": "Objetivo",
        "value": "Escolher e evoluir um caminho"
      }
    ],
    "story": [
      "Primis chega a uma fortaleza ligada aos experimentos do Grupo 935 e à presença de grandes depósitos do Elemento 115.",
      "O castelo mistura arquitetura antiga, sistemas tecnológicos e uma instalação que aponta para uma missão fora da Terra.",
      "A jornada do grupo avança enquanto Dempsey enfrenta uma parte central do plano de Richtofen."
    ],
    "characters": [
      {
        "name": "Edward Richtofen",
        "role": "Planejador",
        "summary": "Mantém o grupo em movimento enquanto protege detalhes do plano.",
        "code": "ER"
      },
      {
        "name": "Tank Dempsey",
        "role": "Alvo da missão",
        "summary": "O mapa concentra uma etapa pessoal de sua jornada.",
        "code": "TD"
      },
      {
        "name": "Takeo Masaki",
        "role": "Guerreiro",
        "summary": "Segue a missão enquanto avalia as decisões de Richtofen.",
        "code": "TM"
      },
      {
        "name": "Nikolai Belinski",
        "role": "Soldado",
        "summary": "Ajuda a equipe a atravessar o castelo e seus sistemas.",
        "code": "NB"
      }
    ],
    "mechanics": [
      {
        "title": "Wrath of the Ancients",
        "summary": "O arco base abre quatro caminhos elementais.",
        "details": "A escolha do arco muda a rota de aprimoramento e cria uma experiência diferente para cada jogador do grupo."
      },
      {
        "title": "Dragões",
        "summary": "Três dragões liberam o acesso ao arco base.",
        "details": "Os dragões funcionam como uma introdução visual à progressão do mapa e aos caminhos elementais."
      },
      {
        "title": "Antigravidade",
        "summary": "A pirâmide altera a movimentação de uma área central.",
        "details": "O sistema combina mobilidade, símbolos e etapas que incentivam observar o ambiente."
      },
      {
        "title": "Ragnaroks",
        "summary": "Equipamento montável usado na preparação do grupo.",
        "details": "As peças e a montagem podem ser acompanhadas como um arquivo separado do arsenal."
      }
    ],
    "quest": [
      {
        "title": "Ativar os dragões",
        "description": "Complete os três pontos para liberar o arco base."
      },
      {
        "title": "Escolher um arco",
        "description": "Selecione o caminho elemental adequado ao seu estilo."
      },
      {
        "title": "Evoluir o arco",
        "description": "Conclua a sequência visual do elemento escolhido."
      },
      {
        "title": "Preparar os Ragnaroks",
        "description": "Reúna as peças do equipamento especial."
      },
      {
        "title": "Organizar a etapa final",
        "description": "Revise armas, vantagens e recursos do grupo."
      }
    ],
    "secrets": [
      {
        "title": "Sala do foguete",
        "description": "A contagem regressiva altera temporariamente a exploração da área."
      },
      {
        "title": "Símbolos da pirâmide",
        "description": "Um conjunto de marcas conecta antigravidade e progressão."
      },
      {
        "title": "Arquivo dos cavaleiros",
        "description": "Um resumo visual dos temas associados aos quatro arcos."
      }
    ],
    "interaction": {
      "type": "bows",
      "title": "Forja elemental",
      "description": "Escolha um arco para alterar o painel e abrir sua trilha resumida.",
      "bows": [
        {
          "name": "Arco elétrico",
          "code": "E",
          "tone": "#72c9ff",
          "steps": [
            "Descobrir os símbolos",
            "Carregar as urnas",
            "Concluir o ritual"
          ]
        },
        {
          "name": "Arco de fogo",
          "code": "F",
          "tone": "#ff7548",
          "steps": [
            "Iniciar o caminho",
            "Atingir os alvos",
            "Finalizar a forja"
          ]
        },
        {
          "name": "Arco do lobo",
          "code": "W",
          "tone": "#d2e5ef",
          "steps": [
            "Reunir os fragmentos",
            "Seguir o espírito",
            "Restaurar o arco"
          ]
        },
        {
          "name": "Arco do vazio",
          "code": "V",
          "tone": "#c47cff",
          "steps": [
            "Abrir o caminho",
            "Interpretar as runas",
            "Completar a invocação"
          ]
        }
      ]
    },
    "welcome": "Castelo avistado. Runas antigas e tecnologia avançada coexistem neste arquivo.",
    "directive": "Escolha um arco elemental, siga sua trilha de upgrade e acompanhe a etapa pessoal de Dempsey.",
    "presence": {
      "name": "Guardião do castelo",
      "subtitle": "Eco elemental",
      "description": "Der Eisendrache transforma cada arco em um caminho próprio e faz do castelo um mapa de domínio e leitura do espaço.",
      "motif": "neve"
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Castelo sob a neve",
        "description": "A composição entre muralhas, laboratório e montanhas dá ao mapa uma identidade visual fortíssima."
      },
      {
        "label": "Por que clicar",
        "title": "Quatro caminhos elementais",
        "description": "Cada arco oferece personalidade própria e uma motivação clara para explorar a página."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Ritmo e elegância",
        "description": "Der Eisendrache é lembrado por ser acessível, bonito e muito recompensador de aprender."
      }
    ],
    "arsenal": [
      {
        "type": "Arco",
        "name": "Wrath of the Ancients",
        "description": "Base para os quatro caminhos elementais do mapa."
      },
      {
        "type": "Upgrades",
        "name": "Arcos elementais",
        "description": "Fogo, lobo, vazio e relâmpago funcionam como minijornadas dentro do castelo."
      },
      {
        "type": "Estrutura",
        "name": "Pirâmide e anti-gravidade",
        "description": "Elementos de mobilidade e ritual que mudam a leitura do cenário."
      }
    ],
    "soundtrack": [
      {
        "title": "Dead Again",
        "note": "Canção secreta associada ao mapa, com energia intensa e melancolia."
      },
      {
        "title": "Tema do castelo",
        "note": "Cordas frias, ecos e peso épico sustentam o clima nevado."
      },
      {
        "title": "Tensão elemental",
        "note": "A trilha aumenta a grandiosidade das áreas ritualísticas e do foguete."
      }
    ]
  },
  "zetsubou-no-shima": {
    "id": "zetsubou-no-shima",
    "file": "Arquivo 04 — ZNS",
    "title": "Zetsubou No Shima",
    "location": "Ilha do Pacífico",
    "image": "assets/images/maps/zetsubou_no_shima.jpg",
    "theme": {
      "primary": "#72bf62",
      "primaryLight": "#c7f0b7",
      "primaryDark": "#15351b",
      "glow": "rgba(114, 191, 98, 0.3)"
    },
    "introduction": "A Divisão 9 transformou uma ilha em laboratório. Combine água e tratamento para visualizar diferentes resultados botânicos.",
    "status": "Laboratório botânico disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Primis"
      },
      {
        "label": "Identidade",
        "value": "Horror biológico"
      },
      {
        "label": "Interação",
        "value": "Cultivo experimental"
      },
      {
        "label": "Objetivo",
        "value": "Controlar água, plantas e bunker"
      }
    ],
    "story": [
      "Primis chega a uma ilha usada pela Divisão 9 para experimentos com o Elemento 115, plantas, animais e prisioneiros.",
      "O ambiente demonstra como a pesquisa científica do universo Zombies se transforma em contaminação e mutação.",
      "A missão também leva Takeo a confrontar uma versão de si mesmo e a verdade sobre sua lealdade."
    ],
    "characters": [
      {
        "name": "Takeo Masaki",
        "role": "Centro da missão",
        "summary": "O mapa confronta Takeo com sua história, seu dever e uma versão anterior de si mesmo.",
        "code": "TM"
      },
      {
        "name": "Edward Richtofen",
        "role": "Planejador",
        "summary": "Continua executando o plano ligado às versões anteriores da equipe.",
        "code": "ER"
      },
      {
        "name": "Tank Dempsey",
        "role": "Soldado",
        "summary": "Apoia o grupo durante a exploração da instalação biológica.",
        "code": "TD"
      },
      {
        "name": "Nikolai Belinski",
        "role": "Soldado",
        "summary": "Observa o conflito pessoal de Takeo durante a missão.",
        "code": "NB"
      }
    ],
    "mechanics": [
      {
        "title": "Águas coloridas",
        "summary": "Três tipos de água alteram o cultivo das plantas.",
        "details": "A escolha da água cria resultados diferentes e incentiva experimentação controlada dentro do mapa."
      },
      {
        "title": "Esporos",
        "summary": "A vegetação libera esporos que afetam a exploração.",
        "details": "Os esporos servem como recurso ambiental e ajudam a definir a atmosfera biológica da ilha."
      },
      {
        "title": "Bunker",
        "summary": "A instalação subterrânea concentra sistemas e segredos.",
        "details": "Abrir o bunker muda o ritmo do mapa e libera áreas importantes para a progressão."
      },
      {
        "title": "KT-4",
        "summary": "A wonder weapon está ligada às pesquisas da ilha.",
        "details": "A montagem da arma pode futuramente receber um painel visual fiel, usando referências reais do jogo."
      }
    ],
    "quest": [
      {
        "title": "Restaurar a energia",
        "description": "Ative os sistemas necessários para abrir o bunker."
      },
      {
        "title": "Investigar o laboratório",
        "description": "Explore as áreas de pesquisa e seus registros."
      },
      {
        "title": "Preparar a KT-4",
        "description": "Reúna os componentes da arma especial."
      },
      {
        "title": "Cultivar os recursos",
        "description": "Use plantas e águas para preparar a progressão."
      },
      {
        "title": "Confrontar o arquivo de Takeo",
        "description": "Avance até a etapa pessoal da missão."
      }
    ],
    "secrets": [
      {
        "title": "Arquivos da Divisão 9",
        "description": "Registros curtos explicam o propósito dos experimentos."
      },
      {
        "title": "Plantas especiais",
        "description": "Combinações diferentes podem produzir resultados únicos."
      },
      {
        "title": "Laboratório profundo",
        "description": "Um arquivo visual resume as áreas abaixo do bunker."
      }
    ],
    "interaction": {
      "type": "lab",
      "title": "Laboratório botânico",
      "description": "Selecione água e tratamento para gerar um resultado visual do experimento.",
      "waters": [
        {
          "name": "Água azul",
          "code": "AZ",
          "tone": "#4da9ff"
        },
        {
          "name": "Água verde",
          "code": "VD",
          "tone": "#78d36f"
        },
        {
          "name": "Água roxa",
          "code": "RX",
          "tone": "#b57cff"
        }
      ],
      "treatments": [
        {
          "name": "Cultivo simples",
          "effect": "Planta de recurso",
          "description": "Uma simulação de cultivo básico para registrar a combinação."
        },
        {
          "name": "Cultivo avançado",
          "effect": "Planta especial",
          "description": "Uma simulação visual com maior nível de atividade biológica."
        },
        {
          "name": "Tratamento KT-4",
          "effect": "Mutação controlada",
          "description": "Representação temática da influência da wonder weapon no cultivo."
        }
      ]
    },
    "welcome": "Divisão 9 online. Ambiente úmido, contaminado e biologicamente ativo.",
    "directive": "Teste combinações, acompanhe o laboratório orgânico e descubra por que Zetsubou é um dos mapas mais sombrios do ciclo.",
    "presence": {
      "name": "Laboratório da Divisão 9",
      "subtitle": "Ameaça orgânica",
      "description": "Mais do que um lugar, Zetsubou parece um organismo. O horror vem da sensação de contaminação e experimento vivo.",
      "motif": "esporos"
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Horror biológico",
        "description": "A ilha mistura pântano, laboratório e ruína, criando um ambiente pesado e memorável."
      },
      {
        "label": "Por que clicar",
        "title": "Água, plantas e upgrades",
        "description": "As interações do mapa têm lógica de experimento, o que ajuda a transformar o aprendizado em descoberta."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Divisão 9 e atmosfera",
        "description": "Poucos mapas têm uma identidade ambiental tão agressiva e tão ligada ao próprio gameplay."
      }
    ],
    "arsenal": [
      {
        "type": "Wonder Weapon",
        "name": "KT-4",
        "description": "Arma química ligada ao tema de mutação e toxinas da ilha."
      },
      {
        "type": "Upgrade",
        "name": "Masamune",
        "description": "Versão avançada da KT-4, central para o domínio do mapa."
      },
      {
        "type": "Recurso",
        "name": "Águas coloridas",
        "description": "Sistema de amostras que muda a forma de cultivar plantas e explorar a ilha."
      }
    ],
    "soundtrack": [
      {
        "title": "Dead Flowers",
        "note": "Canção secreta que amplia o clima melancólico e perturbador."
      },
      {
        "title": "Trilha de laboratório",
        "note": "Ruídos úmidos, sintetizadores e tensão orgânica dominam o ambiente."
      },
      {
        "title": "Assinatura da Divisão 9",
        "note": "A ambientação sonora reforça o horror biológico e o isolamento."
      }
    ]
  },
  "gorod-krovi": {
    "id": "gorod-krovi",
    "file": "Arquivo 05 — GK",
    "title": "Gorod Krovi",
    "location": "Stalingrado alternativa",
    "image": "assets/images/maps/gorod_krovi.jpg",
    "theme": {
      "primary": "#e35e3f",
      "primaryLight": "#ffb09b",
      "primaryDark": "#421811",
      "glow": "rgba(227, 94, 63, 0.32)"
    },
    "introduction": "Dragões, máquinas e ruínas disputam o mesmo campo de batalha. Complete os desafios do console e libere a rota aérea.",
    "status": "Console de cerco disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Primis"
      },
      {
        "label": "Identidade",
        "value": "Guerra e fantasia"
      },
      {
        "label": "Interação",
        "value": "Desafios de cerco"
      },
      {
        "label": "Objetivo",
        "value": "Preparar o transporte do dragão"
      }
    ],
    "story": [
      "Primis chega a uma Stalingrado alterada, onde soldados mecanizados e dragões transformaram a cidade em um conflito impossível.",
      "O mapa combina tecnologia do Grupo 935, experimentos da Divisão 9 e uma estrutura de guerra que ocupa ruas, prédios e céus.",
      "A missão conduz Nikolai ao confronto com sua versão anterior e a uma decisão central para o grupo."
    ],
    "characters": [
      {
        "name": "Nikolai Belinski",
        "role": "Centro da missão",
        "summary": "A etapa pessoal de Nikolai domina o conflito e o desfecho do mapa.",
        "code": "NB"
      },
      {
        "name": "Edward Richtofen",
        "role": "Planejador",
        "summary": "Mantém o grupo focado na coleta necessária para o plano.",
        "code": "ER"
      },
      {
        "name": "Tank Dempsey",
        "role": "Soldado",
        "summary": "Enfrenta a cidade como uma operação militar de alto risco.",
        "code": "TD"
      },
      {
        "name": "Takeo Masaki",
        "role": "Guerreiro",
        "summary": "Acompanha Nikolai depois de enfrentar sua própria etapa na ilha.",
        "code": "TM"
      }
    ],
    "mechanics": [
      {
        "title": "Cápsulas Groph",
        "summary": "Eventos de defesa ajudam a preparar o acesso ao dragão.",
        "details": "As cápsulas criam pequenos pontos de cerco e distribuem o progresso pela cidade."
      },
      {
        "title": "Dragão",
        "summary": "O transporte aéreo conecta a cidade a uma área importante.",
        "details": "A rota do dragão transforma a movimentação em uma parte visual da identidade do mapa."
      },
      {
        "title": "Sophia",
        "summary": "A inteligência do sistema orienta etapas da instalação.",
        "details": "Seu console funciona como ponto central para organização de desafios e registros."
      },
      {
        "title": "Gauntlet of Siegfried",
        "summary": "Equipamento especial ligado a um pequeno dragão.",
        "details": "O arsenal pode receber futuramente um modelo fiel, desde que exista uma referência adequada."
      }
    ],
    "quest": [
      {
        "title": "Ativar os sistemas",
        "description": "Abra as rotas principais e localize o console central."
      },
      {
        "title": "Completar as cápsulas",
        "description": "Conclua os eventos necessários para avançar."
      },
      {
        "title": "Liberar o dragão",
        "description": "Prepare o transporte para a próxima área."
      },
      {
        "title": "Organizar os desafios",
        "description": "Complete a sequência apresentada pelo console."
      },
      {
        "title": "Preparar o confronto",
        "description": "Revise equipamentos e recursos antes da arena."
      }
    ],
    "secrets": [
      {
        "title": "Mensagens de Sophia",
        "description": "Linhas curtas revelam o papel do sistema na instalação."
      },
      {
        "title": "Ovo do dragão",
        "description": "Um arquivo acompanha a progressão do equipamento especial."
      },
      {
        "title": "Arquivo de Nikolai",
        "description": "Registro centrado no conflito entre as duas versões do personagem."
      }
    ],
    "interaction": {
      "type": "dragon",
      "title": "Console de cerco",
      "description": "Conclua três desafios para liberar a rota do dragão.",
      "challenges": [
        {
          "name": "Defesa Groph",
          "code": "01",
          "description": "Estabilize a primeira zona de combate."
        },
        {
          "name": "Rede de Sophia",
          "code": "02",
          "description": "Restaure o segundo nó do sistema."
        },
        {
          "name": "Sinal do dragão",
          "code": "03",
          "description": "Ative o marcador da rota aérea."
        }
      ]
    },
    "welcome": "Stalingrado em chamas. Cinzas no ar e atividade dracônica confirmada.",
    "directive": "Conclua desafios, prepare a cidade para o combate e acompanhe a presença de Sophia e dos dragões.",
    "presence": {
      "name": "Sophia",
      "subtitle": "Núcleo estratégico",
      "description": "Entre bombardeios e fogo, Gorod Krovi equilibra guerra total, fantasia tecnológica e progressão agressiva.",
      "motif": "cinzas"
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Guerra aberta",
        "description": "O mapa impressiona pela escala, pelo céu em combustão e pela sensação constante de conflito."
      },
      {
        "label": "Por que clicar",
        "title": "Desafios com consequência",
        "description": "Cada tarefa serve para preparar a rota de progressão e criar ritmo entre luta e objetivo."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Dragões e cerco urbano",
        "description": "Gorod é lembrado por transformar a cidade num palco caótico e altamente energético."
      }
    ],
    "arsenal": [
      {
        "type": "Wonder Weapon",
        "name": "Gauntlet of Siegfried",
        "description": "Arma especial ligada aos dragões e ao domínio de combate do mapa."
      },
      {
        "type": "Suporte",
        "name": "Dragon Strike",
        "description": "Ferramenta ofensiva que reforça o tema militar do arquivo."
      },
      {
        "type": "Mobilidade",
        "name": "Rede de desafios",
        "description": "Sequência de ações que guia o jogador pelo avanço em Stalingrado."
      }
    ],
    "soundtrack": [
      {
        "title": "Dead Ended",
        "note": "Canção secreta intensa e explosiva, em sintonia com o caos do mapa."
      },
      {
        "title": "Bombardeio urbano",
        "note": "Sirenes, impactos e ambiência pesada dominam o cenário."
      },
      {
        "title": "Assinatura de guerra",
        "note": "A trilha usa tensão contínua para sustentar o sentimento de cerco."
      }
    ]
  },
  "revelations": {
    "id": "revelations",
    "file": "Arquivo 06 — REV",
    "title": "Revelations",
    "location": "Agartha",
    "image": "assets/images/maps/revelations.jpg",
    "theme": {
      "primary": "#d786ff",
      "primaryLight": "#f0c7ff",
      "primaryDark": "#331443",
      "glow": "rgba(215, 134, 255, 0.34)"
    },
    "introduction": "Fragmentos de lugares conhecidos flutuam em Agartha. Selecione cada área para reconstruir o arquivo final do ciclo.",
    "status": "Navegador dimensional disponível",
    "overview": [
      {
        "label": "Equipe",
        "value": "Primis"
      },
      {
        "label": "Identidade",
        "value": "Colisão dimensional"
      },
      {
        "label": "Interação",
        "value": "Fragmentos de mapas"
      },
      {
        "label": "Objetivo",
        "value": "Reconstruir as conexões"
      }
    ],
    "story": [
      "Primis alcança Agartha e encontra fragmentos de locais conhecidos unidos em uma realidade instável.",
      "O mapa reúne referências de diferentes capítulos enquanto coloca Dr. Monty e o Shadowman no centro do conflito.",
      "A conclusão fecha o ciclo de Black Ops III e transforma a própria repetição da história em parte do desfecho."
    ],
    "characters": [
      {
        "name": "Edward Richtofen",
        "role": "Planejador",
        "summary": "Chega ao ponto em que seu plano encontra as forças que controlam Agartha.",
        "code": "ER"
      },
      {
        "name": "Tank Dempsey",
        "role": "Soldado",
        "summary": "Acompanha o grupo através de fragmentos de batalhas anteriores.",
        "code": "TD"
      },
      {
        "name": "Takeo Masaki",
        "role": "Guerreiro",
        "summary": "Entra no fim do ciclo depois de completar sua jornada pessoal.",
        "code": "TM"
      },
      {
        "name": "Nikolai Belinski",
        "role": "Soldado",
        "summary": "Chega ao desfecho carregando as consequências de Gorod Krovi.",
        "code": "NB"
      }
    ],
    "mechanics": [
      {
        "title": "Fragmentos",
        "summary": "Áreas de mapas anteriores formam uma rota dimensional.",
        "details": "Cada fragmento preserva elementos reconhecíveis e funciona como uma lembrança interativa da jornada."
      },
      {
        "title": "Portais",
        "summary": "As conexões substituem uma geografia tradicional.",
        "details": "A navegação depende de compreender como as áreas se conectam, não apenas de seguir ruas ou corredores."
      },
      {
        "title": "Máscaras",
        "summary": "Recompensas opcionais representam diferentes desafios.",
        "details": "O sistema de máscaras incentiva exploração e pode ser apresentado como uma coleção visual."
      },
      {
        "title": "Summoning Key",
        "summary": "O artefato permanece no centro da progressão.",
        "details": "A chave liga a missão atual aos rituais e eventos que começaram em Morg City."
      }
    ],
    "quest": [
      {
        "title": "Abrir os portais",
        "description": "Estabeleça as conexões iniciais entre os fragmentos."
      },
      {
        "title": "Investigar as áreas",
        "description": "Visite os fragmentos e registre suas origens."
      },
      {
        "title": "Preparar os artefatos",
        "description": "Reúna os elementos necessários para o avanço."
      },
      {
        "title": "Confrontar o Shadowman",
        "description": "Organize o grupo para a etapa ligada ao antagonista."
      },
      {
        "title": "Fechar o ciclo",
        "description": "Complete a sequência final do arquivo de Black Ops III."
      }
    ],
    "secrets": [
      {
        "title": "Fragmentos conhecidos",
        "description": "Cada área desbloqueada registra o mapa de origem."
      },
      {
        "title": "Coleção de máscaras",
        "description": "Um painel futuro poderá reunir máscaras e requisitos."
      },
      {
        "title": "Arquivo do ciclo",
        "description": "Resumo visual da repetição que conduz ao desfecho."
      }
    ],
    "interaction": {
      "type": "fragments",
      "title": "Navegador dimensional",
      "description": "Selecione os fragmentos para reconstruir a rota do mapa.",
      "fragments": [
        {
          "name": "Nacht der Untoten",
          "origin": "Primeiro abrigo",
          "note": "Um núcleo histórico usado como ponto de conexão."
        },
        {
          "name": "Kino der Toten",
          "origin": "Teatro",
          "note": "Parte reconhecível da história retorna como fragmento."
        },
        {
          "name": "Shangri-La",
          "origin": "Templo",
          "note": "Ruínas e estruturas antigas integram o espaço dimensional."
        },
        {
          "name": "Mob of the Dead",
          "origin": "Prisão",
          "note": "Elementos da prisão reaparecem dentro da composição final."
        },
        {
          "name": "Origins",
          "origin": "Escavação",
          "note": "A área associa o encerramento às bases da jornada de Primis."
        },
        {
          "name": "Der Eisendrache",
          "origin": "Castelo",
          "note": "Parte da fortaleza retorna como memória do caminho anterior."
        }
      ]
    },
    "welcome": "Agartha estabilizada parcialmente. Fragmentos de realidade flutuam por todo o horizonte.",
    "directive": "Reconstrua a rota dimensional, conecte memórias de mapas anteriores e explore o encerramento visual da campanha.",
    "presence": {
      "name": "Dr. Monty / Shadowman",
      "subtitle": "Conflito pelo desfecho",
      "description": "Revelations mistura nostalgia, colagem dimensional e espetáculo visual para encerrar o ciclo principal de BO3.",
      "motif": "meteoro"
    },
    "spotlights": [
      {
        "label": "Primeira impressão",
        "title": "Agartha viva",
        "description": "Portais, céus surreais e pedaços de mapas clássicos criam um cenário impossível de ignorar."
      },
      {
        "label": "Por que clicar",
        "title": "Fragmentos reconhecíveis",
        "description": "Cada parte do mapa convida o público a identificar referências e comparar espaços conhecidos."
      },
      {
        "label": "Diferencial do mapa",
        "title": "Escala de final de ciclo",
        "description": "É o mapa em que o espetáculo visual assume o papel principal."
      }
    ],
    "arsenal": [
      {
        "type": "Wonder Weapon",
        "name": "Apothicon Servant (retorno)",
        "description": "A arma reaparece no clímax da jornada e mantém sua identidade cósmica."
      },
      {
        "type": "Arma clássica",
        "name": "Thundergun",
        "description": "Ícone de mapas anteriores, reforça o tom celebratório e final."
      },
      {
        "type": "Mecânica",
        "name": "Fragmentos de mapa",
        "description": "A navegação entre pedaços de realidades antigas sustenta o charme do arquivo."
      }
    ],
    "soundtrack": [
      {
        "title": "The Gift",
        "note": "Canção secreta emocional e importante para a aura de encerramento."
      },
      {
        "title": "Tema de Agartha",
        "note": "Ambiência cósmica, coral e sensação de espaço impossível."
      },
      {
        "title": "Confronto final",
        "note": "A trilha cresce quando o mapa entra em colapso e grandiosidade."
      }
    ]
  }
};
