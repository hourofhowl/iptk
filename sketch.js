const supabase = window.supabase.createClient(
  "https://ceptldrtdwoextjwbgqe.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNlcHRsZHJ0ZHdvZXh0andiZ3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxNzU5ODcsImV4cCI6MjA2NDc1MTk4N30.rpEootIz8HQWwZH0DahC-pTk9jUH0xbJwQJ261YB2LI"     // 🔁 당신의 API 키로 교체
)

let seasonX, seasonY;
let xPlus = true;
let xSpeed = 0.1
let userResponses = [];

let title;
let font1, font2, font3, font4;
let anim = [];
let seed;

let endTime = null;
let current = 0;
let load = [];
let blobs = [];
let step = 0;
let dice = [];
let randomDice = 0;
let main = [];
let texture = [];
let tk;
let qrguide;
let a, b, c, d, e;
let input = false;
let name = "";
let nameInput;
let date = "";
let dateInput;
let currentRect = 0;
let tkColor;
let t;
let next = false;
let illu1, illu2, illu3, illu4;
let illu = true;
let show = null;
let enterSummer = false, enterAutumn = false, enterWinter = false;

let stageScene = "illu";

let countA_1 = 0, countA_2 = 0, countA_3 = 0, countA_4 = 0, countA_5 = 0;
let countB_1 = 0, countB_2 = 0, countB_3 = 0, countB_4 = 0, countB_5 = 0;
let countC_1 = 0, countC_2 = 0, countC_3 = 0, countC_4 = 0, countC_5 = 0;
let countD_1 = 0, countD_2 = 0, countD_3 = 0, countD_4 = 0, countD_5 = 0;
let countE_1 = 0, countE_2 = 0, countE_3 = 0, countE_4 = 0, countE_5 = 0;

let wave;
let waveSpeed = 0;


let emotions = "";
let touch = "";
let smell = "";
let ear = "";
let taste = "";



function preload() {
  title = loadImage("title/Intro_Title.png");
  font1 = loadFont("Press_Start_2P/PressStart2P-Regular.ttf");


  font2 = loadFont("Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf");
  
  for (let i = 1; i < 7; i++) {
    dice[i] = loadImage("dice/tk_dice" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    main[i] = loadImage("main_image/tk_pattern" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    texture[i] = loadImage("texture_new/tk_texture" + i + ".png");
  }
  tk = loadImage("ticket/tk_fixed.png");
  qrguide = loadImage("ticket/tk_qrguide.png");
  font3 = loadFont("ticket/name_Pretendard-Medium.otf");
  font4 = loadFont("ticket/date_SometypeMono-Medium.ttf")
}

 async function setup() {
  createCanvas(1280, 720);


  wave = new Wave(waveSpeed);
  seed = getSeedFromURL();

  userResponses = await loadUserResponses(seed)


  noStroke();

}

function draw() {
  background(220);

  if(userResponses.length > 0){
    ticket();
  }
// image(texture[5],0,0)
// image(texture[1],0,0)
// image(texture[2],0,0)
// image(texture[3],0,0)
// image(texture[4],0,0)
}

function getSeedFromURL() {
  // URL 경로 예: https://hourofhowl.github.io/iptk/abc123
  const hash = window.location.hash; // "#/abc123"
  if (!hash.startsWith("#/")) return null;
  return hash.replace("#/", "");

}

async function loadUserResponses(seed) {
  const { data, error } = await supabase
    .from("userResponses")
    .select("responses")
    .eq("id", seed)
    .single();

  if (error) {
    console.error("불러오기 실패:", error);
    return null;
  }


  return JSON.parse(data.responses);
}

function ticket() {
  
  background(30);
  if (userResponses[4] == "l") {
    waveSpeed = 0.01
  } else if (userResponses[4] == "m") {
    waveSpeed = 0.04
  } else if (userResponses[4] == "h") {
    waveSpeed = 0.07
  }


  switch (userResponses[0]) {
    case 1:
      image(main[1], width / 2, height / 2);
      touch = '몽글몽글 피어오른';
      break;
    case 2:
      image(main[2], width / 2, height / 2);
      touch = '꿈결처럼 얽힌';
      break;
    case 3:
      image(main[3], width / 2, height / 2);
      touch = '고요히 돋아난';
      break;
    case 4:
      image(main[4], width / 2, height / 2);
      touch = '살랑이는';
      break;
    case 5:
      image(main[5], width / 2, height / 2);
      touch = '나지막이 깔린';
      break;

}

  wave.speed = waveSpeed;
  wave.update();
  wave.display();

  //2. 티켓 형태와 배경색(계절_answer6, 감정_answer5)
  if (userResponses[5] == "sl") {
    fill(255, 188, 84, 100)
  } else if (userResponses[5] == "sh") {
    fill(255, 188, 84, 200)
  } else if (userResponses[5] == "ul") {
    fill(48, 252, 255, 100)
  } else if (userResponses[5] == "uh") {
    fill(48, 252, 255, 200)
  } else if (userResponses[5] == "al") {
    fill(253, 35, 1, 100)
  } else if (userResponses[5] == "ah") {
    fill(253, 35, 1, 200)
  } else if (userResponses[5] == "wl") {
    fill(238, 246, 255, 100)
  } else if (userResponses[5] == "wh") {
    fill(238, 246, 255, 200)
  }



  strokeWeight(1);
  stroke(0);
  rectMode(CORNER);
  rect(250, 225.5 - 35, 780, 270);

  //3. 티켓 질감(후각_answer2)
   imageMode(CENTER)

  image(texture[userResponses[1]], 1280 / 2, 720 / 2 - 35);
 

  image(main[userResponses[0]], 1280 / 2, 720 / 2);



  image(dice[userResponses[2]], 1280 / 2, 720 / 2);




//주관식 답변 결과
textAlign(CENTER);
stroke(0);
strokeWeight(0);
fill(0);
textSize(18);
textFont(font3);
text(userResponses[6], 404, 387  -26);
textFont(font4);
textSize(20);
text(userResponses[7], 556, 468 -26);

 textAlign(CENTER);
  textFont(font2);
  fill(255);
  noStroke()
textAlign(CENTER);
text(userResponses[8], 1280 / 2, 600);


 textFont(font3);
  textAlign(LEFT)
  fill(0);
text(userResponses[3], 272, 432 - 35);




 //해설
  if (mouseX > 272 && mouseX < 303 && mouseY < 437 && mouseY > 406) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(285, 420, 10);
    line(280, 420, 230, 420);
    fill(200, 150);
    stroke(0);
    rectMode(CENTER);
    rect(120, 420, 220, 240);
    textAlign(CENTER);
    textSize(12.5);
    textFont(font2);
    fill(255);
    stroke(255);
    text("당신이 세상에 대해 느끼는 거리감에 따라\n주사위 안 숫자가 달라집니다.\n당신에게 세상이\n친밀하고 충만하게 다가오는지,\n아니면 약간은 낯설거나\n거리감이 느껴지는지에 따라 말이지요.\n주사위의 숫자가 작아질수록 당신은\n세상에 담담히 자리잡은\n돌벽과 같을 것이고,\n주사위의 숫자가 커질수록\n세상을 기꺼이\n끌어안으려는 품과 같은 사람일 것입니다.", 120, 340);
  } else if (mouseX > 690 && mouseX < 908 && mouseY < 432 && mouseY > 214) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(800, 320, 50);
    line(825, 320, 1045, 320);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(1155, 320, 220, 180);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    fill(255);
    stroke(255);
    if (userResponses[0]==1) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n이 모양이 결정됩니다.\n몽글몽글하게 피어오르는\n구름의 모양처럼,\n당신은 세계를 부드럽고 말랑하게\n받아들이는 사람 같습니다.", 1155, 270);
    } else if (userResponses[0]==2) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n이 모양이 결정됩니다.\n잔뜩 얽힌 덩굴의 모양처럼,\n당신은 세계와 밀접한 관계를 유지하며\n얼기설기 뻗어나가고 있는 사람 같습니다.", 1155, 270);
    } else if (userResponses[0]==3) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n이 모양이 결정됩니다.\n꼿꼿하게 솟아난 선인장의 모양처럼,\n당신은 강인함과 차분함을 지니고\n하늘을 향해 굳건히 서 있는 사람 같습니다.", 1155, 270);
    } else if (userResponses[0]==4) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n이 모양이 결정됩니다.\n바람에 살랑이는 꽃잎의 움직임처럼,\n당신은 유연하고 상쾌한 몸짓으로\n세계를 받아들이는 사람 같습니다.", 1155, 270);
    } else if (userResponses[0]==5) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n이 모양이 결정됩니다.\n나지막한 이끼의 분포처럼,\n당신은 따스한 온도를 지니고서\n세계에 조용한 생명력을\n불어넣는 사람 같습니다.", 1155, 270);
    }
  } else if (mouseX > 250 && mouseX < 1030 && mouseY < 460.5 && mouseY > 190.5) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(480, 400, 50);
    line(480, 425, 480, 465);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(480, 515, 340, 100);
    rect(860, 515, 380, 100);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    fill(255);
    stroke(255);
    text("내면 깊숙한 곳을 감싸고 있는 당신의 감정 상태는 어떠한가요?\n그 미묘한 감정들이, 당신이 사랑하는 계절의 빛깔과 만나\n티켓의 배경색으로 표현되었을 겁니다.", 480, 505);
    if (userResponses[1]==1) {
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라\n티켓의 질감이 표현될 것입니다.\n반복된 물결로 잘 다듬어진 조약돌처럼,\n당신은 매끈하고 넉살좋게 외부의 향기를 받아들이는 것 같습니다.", 860, 495);
    } else if (userResponses[1]==2) {
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라\n티켓의 질감이 표현될 것입니다.\n당신은 까끌거리는 모래처럼,\n세밀하고 민감하게 외부의 향기를 받아들이는 것 같습니다.", 860, 495);
    } else if (userResponses[1]==3) {
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라\n티켓의 질감이 표현될 것입니다.\n당신은 거칠한 나무처럼\n격한 바람 속에서도 쉽게 흔들리지 않고 묵묵히 한 자리를 지키며,\n외부의 향기를 천천히 그러나 깊이 받아들이는 것 같습니다.", 860, 495);
    } else if (userResponses[1]==4) {
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라\n티켓의 질감이 표현될 것입니다.\n당신은 외부의 향기를,\n흐르는 물결처럼 자연스럽고 풍성하게 받아들이는 겄 같습니다.", 860, 495);
    } else if (userResponses[1]==5) {
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라\n티켓의 질감이 표현될 것입니다.\n당신은 제각기 반짝이는 별들처럼,\n개성넘치고 톡톡 튀는 방식으로\n외부의 향기를 받아들이는 것 같습니다.", 860, 495);
    }
 } else if (mouseX >= 0 && mouseX <= width && mouseY >= 180 && mouseY <= 530) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(185, 320, 50);
    line(185, 295, 185, 120);
    line(185, 120, 210, 120);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(385, 100, 350, 140);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    fill(255);
    stroke(255);
    text("티켓 뒤로 당신의 파동이 흐르고 있네요.\n그것의 진폭과 움직이는 속도는 당신의 것과 닮아 있을 것입니다.\n당신이 디지털 세상의 신속함에 발맞춰 함께 빨라졌는지,\n아니면 아직은 자연의 느릿함을 그리워하고 있는지,\n그에 따라 파동은 재빠르게 일렁이거나,\n혹은 잔잔히 퍼져나갈 것입니다.", 385, 60);
  } 



//마지막에 티켓 고정이미지, qr 안내
  image(tk, width / 2, height / 2);
}




