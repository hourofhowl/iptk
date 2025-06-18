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
  imageMode(CENTER)


  wave = new Wave(waveSpeed);
  seed = getSeedFromURL();

  userResponses = await loadUserResponses(seed)


  noStroke();

}

function draw() {
  background(220);
  translate(width, 0);         // (0,0)을 오른쪽 위로 이동
  rotate(HALF_PI); 

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
  textSize(20);
  fill(255);
  stroke(255);
  strokeWeight(2);
  textAlign(CENTER,CENTER);
  textFont(font2);
  text("티켓의 요소들에 마우스 커서를 올려보세요", width/2, 160);
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
   

  image(texture[userResponses[1]], width / 2, height / 2 - 35);
 

  image(main[userResponses[0]], width / 2, height / 2);



  image(dice[userResponses[2]], width / 2, height / 2);




//주관식 답변 결과
textAlign(CENTER);
  noStroke();
  fill(0);
  textSize(18);
  textFont(font3);
text(userResponses[6], 404, 387  -35);
textFont(font4);
textSize(20);
text(userResponses[7], 556, 468 -35.5);

textAlign(CENTER);
  textFont(font2);
  stroke(255);
  strokeWeight(2);
  fill(255);
text(userResponses[8], 1280 / 2, 650);


 textFont(font3);
  textAlign(LEFT,CENTER);
  fill(0);
  noStroke();
text(userResponses[3], 272, 432 - 50);




 //해설
 if (mouseX > 272 && mouseX < 303 && mouseY < 437 && mouseY > 406) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(285, 420, 10);
    line(280, 420, 230, 420);
    fill(0, 150);
    stroke(0);
    rectMode(CENTER);
    rect(120, 420, 220, 240);
    textAlign(CENTER);
    textSize(15);
    textFont(font2);
    fill(255);
    stroke(255);
    text("당신과 세상 사이의 거리에 따라\n주사위 숫자가 달라집니다.\n당신이 세상에 친밀함을 느끼고\n그를 기꺼이 끌어안으려 한다면\n숫자는 커지고,\n아직 낯설어\n그로부터 담담히 자리잡은\n돌벽과 같다면\n숫자는 작아질 것입니다.", 120, 420);
 } else if (mouseX > 690 && mouseX < 908 && mouseY < 432 && mouseY > 214) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(800, 320, 50);
    line(825, 320, 1045, 320);
    fill(0, 150);
    stroke(0);
    rectMode(CENTER);
    rect(1155, 320, 220, 180);
    textAlign(CENTER);
    textSize(15);
    textFont(font2);
    fill(255);
    stroke(255);
    if (userResponses[0]==1) {
     text("당신의 손끝으로 느낀\n촉각 기억에 따라\n모양이 결정됩니다.\n끊임없는 별똥별의 궤적처럼,\n당신은 세상에 따스한\n희망을 남기는 사람 같습니다.", 1155, 320);
    } else if (userResponses[0]==2) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n모양이 결정됩니다.\n잔뜩 얽힌 덩굴처럼,\n당신은 세계와 얼기설기 얽혀\n뻗어나가고 있는 사람 같습니다.", 1155, 320);
    } else if (userResponses[0]==3) {
       text("당신의 손끝으로 느낀\n촉각 기억에 따라\n모양이 결정됩니다.\n사방으로 돋은 선인장처럼,\n당신은 세계를 세밀하고 예리하게\n지각하는 사람 같습니다.", 1155, 320);
    } else if (userResponses[0]==4) {
       text("당신의 손끝으로 느낀\n촉각 기억에 따라\n모양이 결정됩니다.\n바람에 일렁이는 꽃잎처럼,\n당신은 유연한 몸짓으로\n세계를 받아들이는 사람 같습니다.", 1155, 320);
    } else if (userResponses[0]==5) {
      text("당신의 손끝으로 느낀\n촉각 기억에 따라\n모양이 결정됩니다.\n나지막한 이끼의 분포처럼,\n당신은 세계에 고요한\n생명력을 불어넣는 사람 같습니다.", 1155, 320);
    }
  } else if (mouseX > 250 && mouseX < 1030 && mouseY < 460.5 && mouseY > 190.5) {
  fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(480, 400, 50);
    line(480, 425, 480, 495);
    fill(0, 150);
    stroke(0);
    rectMode(CENTER);
    rect(480, 545, 340, 100);
    rect(860, 545, 380, 100);
    textAlign(CENTER);
    textSize(15);
    textFont(font2);
    fill(255);
    stroke(255);
   text("켜켜이 쌓여 당신의 내면을 이루고 있을\n감정들이 궁금합니다.\n당신이 사랑하는 계절의 빛깔에,\n미묘한 감정의 조도가 덧입혀져\n티켓의 색으로 표현되었습니다.", 480, 545);
    if (userResponses[1]==1) {
     text("향기를 느끼는 방식에 따라\n티켓의 질감이 표현됩니다.\n당신은 잘 다듬어진 조약돌처럼,\n묵묵히 향기를 받아들이는 것 같습니다.", 860, 545);
    } else if (userResponses[1]==2) {
     text("향기를 느끼는 방식에 따라\n티켓의 질감이 표현됩니다.\n당신은 까끌거리는 모래처럼,\n세밀하고 민감하게 향기를 받아들이는 것 같습니다.", 860, 545);
    } else if (userResponses[1]==3) {
       text("향기를 느끼는 방식에 따라\n티켓의 질감이 표현됩니다.\n당신은 돌풍에도 흔들림 없는 나무처럼\n굳건하게 향기를 받아들이는 것 같습니다.", 860, 545);
    } else if (userResponses[1]==4) {
     text("향기를 느끼는 방식에 따라\n티켓의 질감이 표현됩니다.\n당신은 흐르는 물결처럼\n자연스럽고 풍성하게 향기를 받아들이는 것 같습니다.", 860, 545);
    } else if (userResponses[1]==5) {
       text("향기를 느끼는 방식에 따라\n티켓의 질감이 표현됩니다.\n당신은 제각기 반짝이는 별들처럼,\n개성넘치게 향기를 받아들이는 것 같습니다.", 860, 545);
    }
 } else if (mouseX >= 0 && mouseX <= width && mouseY >= 180 && mouseY <= 530) {
   fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(85, 320, 50);
    line(85, 295, 85, 120);
    line(85, 120, 110, 120);
    fill(0, 150);
    stroke(0);
    rectMode(CENTER);
    rect(285, 100, 350, 140);
    textAlign(CENTER);
    textSize(15);
    textFont(font2);
    fill(255);
    stroke(255);
    text("당신이 디지털 기술의 도래와 함께 빨라졌는지,\n아니면 아직은 자연의 느릿함을 그리워하는지에 따라\n이 파동은 재빠르게 일렁이거나,\n혹은 잔잔히 퍼져나갈 것입니다.", 285, 100);
  } 



//마지막에 티켓 고정이미지, qr 안내
  image(tk, width / 2, height / 2);
}




