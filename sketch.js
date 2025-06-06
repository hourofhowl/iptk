const GEMINI_API_KEY = 'AIzaSyCrZCoVlHR1njeO15_k4qARL1rRyL9PRqc'
let myInput;
let geminiCalled = false;

let seasonX, seasonY;
let xPlus = true;
let xSpeed = 0.1

let title;
let font1, font2, font3, font4;
let anim = [];

let tunnel;
let tunnelSpr;
let tunnelSum;
let tunnelAut;
let tunnelWin;

let endTime = null;
let current = 0;
let state = 'start';
let spring = [], summer = [], autumn = [], winter = [];
let springText = [], summerText = [], autumnText = [], winterText = [];
let stage = 0;
let answer1 = [], answer2 = [], answer3 = [], answer4 = [], answer5 = [], answer6 = [];
let noticeTime = null;
let seasonQuestion = 1;
let personal = [];
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

let stageScene = 'illu';

let countA_1 = 0, countA_2 = 0, countA_3 = 0, countA_4 = 0, countA_5 = 0;
let countB_1 = 0, countB_2 = 0, countB_3 = 0, countB_4 = 0, countB_5 = 0;
let countC_1 = 0, countC_2 = 0, countC_3 = 0, countC_4 = 0, countC_5 = 0;
let countD_1 = 0, countD_2 = 0, countD_3 = 0, countD_4 = 0, countD_5 = 0;
let countE_1 = 0, countE_2 = 0, countE_3 = 0, countE_4 = 0, countE_5 = 0;

let wave;
let waveSpeed = 0;

let geminiInput = "";
let emotions = "";
let touch = '';
let smell = '';
let ear = '';
let taste = '';
let geminiOutput = '';


function preload() {
  title = loadImage("title/Intro_Title.png");
  font1 = loadFont("Press_Start_2P/PressStart2P-Regular.ttf");
  
  
  font2 = loadFont("Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf");
  for (let i = 1; i < 4; i++) {
    personal[i] = loadImage("fq/fq_" + i + ".png");
  }
  for (let i = 1; i < 12; i++) {
    load[i] = loadImage("fq/load_" + i + ".png");
  }
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

function setup() {
  createCanvas(1280, 720);


  wave = new Wave(waveSpeed);
  randomDice = int(random(0, 2));


  noStroke();

}

function draw() {
  background(220);
  
    ticket();
  
}

function getSeedFromURL() {
  // URL 경로 예: https://hourofhowl.github.io/iptk/abc123
  const pathParts = window.location.pathname.split('/');
  const seed = pathParts[pathParts.length - 1];
  return seed || null;
}

async function loadUserResponses(seed) {
  const { data, error } = await supabase
    .from("userResponses")
    .select("responses")
    .eq("id", seed)
    .single();

  if (error) {
    console.error("❌ 불러오기 실패:", error);
    return null;
  }

  console.log("✅ 불러온 응답:", data.responses);
  return data.responses;
}

function ticket() {
  background(200);


  //1. 배경 모션(청각_answer4)
  for (let i = 0; i < answer4.length; i++) {
    if (answer4[i] == 'a') {
      countA_4++
    } else if (answer4[i] == 'b') {
      countB_4++
    }

  }
  if (countA_4 > countB_4) {
    waveSpeed = 0.01
    ear = '숲속의 고요';
  } else if (countA_4 == countB_4) {
    waveSpeed = 0.04
    if (randomDice == 0) { ear = '숲속의 고요' } else { ear = '신호의 파동' }
  } else if (countA_4 < countB_4) {
    waveSpeed = 0.07
    ear = '신호의 파동';
  }
  wave.speed = waveSpeed;
  wave.update();
  wave.display();

  //2. 티켓 형태와 배경색(계절_answer6, 감정_answer5)
  for (let i = 0; i < 4; i++) {
    tkColor += answer5[i]
    if (0 < tkColor < 250) {
      t = 100;
    } else if (300 < tkColor < 400) {
      t = 200;
    }
  }
  if (answer6 == "spring") {
    fill(255, 188, 84, t);
    if (t = 100) { emotions = "은은한 봄바람" } else { emotions = '봄날의 햇살' }
  } else if (answer6 == "summer") {
    fill(48, 252, 255, t);
    if (t = 100) { emotions = "고요한 밤바다" } else { emotions = '푸르른 파도' }
  } else if (answer6 == "autumn") {
    fill(253, 35, 1, t);
    if (t = 100) { emotions = "잔잔한 가을바람" } else { emotions = '붉은 노을빛' }
  } else if (answer6 == "winter") {
    fill(238, 246, 255, t);
    if (t = 100) { emotions = "깊은 겨울 밤결" } else { emotions = '눈부신 서리' }
  }


  strokeWeight(1);
  stroke(0);
  rectMode(CORNER);
  rect(250, 225.5 - 35, 780, 270);

  //3. 티켓 질감(후각_answer2)
  for (let i = 0; i < answer2.length; i++) {
    if (answer2[i] == 'a') {
      countA_2++
    } else if (answer2[i] == 'b') {
      countB_2++
    } else if (answer2[i] == 'c') {
      countC_2++
    } else if (answer2[i] == 'd') {
      countD_2++
    } else if (answer2[i] == 'e') {
      countE_2++
    }

  }
  let arrayQ2 = [countA_2, countB_2, countC_2, countD_2, countE_2];
  let maxQ2 = Math.max(...arrayQ2)
  if (countA_2 >= maxQ2) {
    image(texture[1], width / 2, height / 2 - 35);
    smell = '조약돌';

  } else if (countB_2 >= maxQ2) {
    image(texture[2], width / 2, height / 2 - 35);
    smell = '모래';
  } else if (countC_2 >= maxQ2) {
    image(texture[3], width / 2, height / 2 - 35);
    smell = '나무';

  } else if (countD_2 >= maxQ2) {
    image(texture[4], width / 2, height / 2 - 35);
    smell = '물결';

  } else if (countE_2 >= maxQ2) {
    image(texture[5], width / 2, height / 2 - 35);
    smell = '별';

  }

  //4. 메인 이미지(촉각_answer1)
  for (let i = 0; i < answer1.length; i++) {
    if (answer1[i] == 'a') {
      countA_1++
    } else if (answer1[i] == 'b') {
      countB_1++
    } else if (answer1[i] == 'c') {
      countC_1++
    } else if (answer1[i] == 'd') {
      countD_1++
    } else if (answer1[i] == 'e') {
      countE_1++
    }

  }
  let arrayQ1 = [countA_1, countB_1, countC_1, countD_1, countE_1];
  let maxQ1 = Math.max(...arrayQ1)
  if (countA_1 >= maxQ1) {
    image(main[1], width / 2, height / 2);
    touch = '몽글몽글 피어오른';

  } else if (countB_1 >= maxQ1) {
    image(main[2], width / 2, height / 2);
    touch = '꿈결처럼 얽힌';

  } else if (countC_1 >= maxQ1) {
    image(main[3], width / 2, height / 2);
    touch = '고요히 돋아난';

  } else if (countD_1 >= maxQ1) {
    image(main[4], width / 2, height / 2);
    touch = '살랑이는';
  } else if (countE_1 >= maxQ1) {
    image(main[5], width / 2, height / 2);
    touch = '나지막이 깔린';
  }
  //5. 주사위(미각_answer3)
  for (let i = 0; i < answer3.length; i++) {
    if (answer3[i] == 'a') {
      countA_3++
    } else if (answer3[i] == 'b') {
      countB_3++
    }

  }
  if (countA_3 > countB_3) {
    if (randomDice == 0) {
      image(dice[5], width / 2, height / 2);
    } else { image(dice[6], width / 2, height / 2); }
    taste = '그것을 기꺼이 끌어안는 품';
  }

  if (countA_3 < countB_3) {
    if (randomDice == 0) {
      image(dice[1], width / 2, height / 2);
    } else { image(dice[2], width / 2, height / 2); }
    taste = '그로부터 담담하게 자리잡은 돌벽';
  }

  if (countA_3 == countB_3) {
    if (randomDice == 0) {
      image(dice[3], width / 2, height / 2);
      taste = '그것을 기까이 끌어안는 품';
    } else {
      image(dice[4], width / 2, height / 2);
      taste = '그로부터 담담하게 자리잡은 돌벽';
    }
  }

  if (geminiCalled == false) { gemini() }

  //주관식 답변 결과
  textAlign(CENTER);
  stroke(0);
  strokeWeight(1);
  fill(50);
  textSize(16);
  textFont(font3);
  text(name, 404, 387 - 35);
  textFont(font4);
  textSize(18);
  text(date, 556, 468 - 35);
  textAlign(CENTER);
  text(geminiInput, width / 2, 600);


  textFont(font3);
  textAlign(LEFT)
  text(geminiOutput, 272, 432 - 35);


  //마지막에 티켓 고정이미지, qr 안내
  image(tk, width / 2, height / 2);
  image(qrguide, width / 2, height / 2);


  //해설
  if (mouseX > 272 && mouseX < 303 && mouseY < 437 && mouseY > 406) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(285, 420, 10);
    line(280, 420, 220, 420);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(120, 420, 200, 240);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    text("당신이 세상에 대해 느끼는 거리감에 따라", 120, 315);
    text("주사위 안 숫자가 달라집니다.", 120, 335);
    text("당신에게 세상이", 120, 360);
    text("친밀하고 충만하게 다가오는지,", 120, 380);
    text("아니면 약간은 낯설거나", 120, 400);
    text("거리감이 느껴지는지에 따라 말이지요.", 120, 420);
    text("주사위의 숫자가 작아질수록 당신은", 120, 445);
    text("세상에 담담히 자리잡은 돌벽과 같을 것이고,", 120, 465);
    text("주사위의 숫자가 커질수록", 120, 485);
    text("세상을 기꺼이", 120, 505);
    text("끌어안으려는 품과 같은 사람일 것입니다.", 120, 525);
  } else if (mouseX > 0 && mouseX < 250 && mouseY < 530 && mouseY > 260) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(185, 320, 50);
    line(185, 295, 185, 120);
    line(185, 120, 230, 120);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(385, 120, 310, 140);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    text("티켓 뒤로 당신의 파동이 흐르고 있네요.", 385, 70);
    text("그것의 진폭과 움직이는 속도는 당신의 것과 닮아 있을 것입니다.", 385, 95);
    text("당신이 디지털 세상의 신속함에 발맞춰 함께 빨라졌는지,", 385, 120);
    text("아니면 아직은 자연의 느릿함을 그리워하고 있는지,", 385, 145);
    text("그에 따라 파동은 재빠르게 일렁이거나, 혹은 잔잔히 퍼져나갈 것입니다.", 385, 170);
  } else if (mouseX > 690 && mouseX < 908 && mouseY < 432 && mouseY > 214) {
    fill(255, 70);
    stroke(255);
    strokeWeight(1);
    ellipse(800, 320, 50);
    line(825, 320, 1045, 320);
    fill(255, 70);
    stroke(0);
    rectMode(CENTER);
    rect(1155, 320, 220, 220);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    if (countA_1 >= maxQ1) {
      text("몽글몽글 피어오른 구름:", 1155, 240);
      text("당신의 손끝으로 느낀", 1155, 260);
      text("촉각 기억에 따라", 1155, 280);
      text("이 모양이 결정됩니다.", 1155, 300);
      text("몽글몽글하게 피어오른", 1155, 320);
      text("구름의 모양처럼,", 1155, 340);
      text("당신은 세계를 부드럽고 말랑하게", 1155, 360);
      text("받아들이는 사람 같습니다.", 1155, 380);
    } else if (countB_1 >= maxQ1) {
      text("잔뜩 얽힌 덩굴:", 1155, 250);
      text("당신의 손끝으로 느낀", 1155, 270);
      text("촉각 기억에 따라", 1155, 290);
      text("이 모양이 결정됩니다.", 1155, 310);
      text("잔뜩 얽힌 덩굴의 모양처럼,", 1155, 330);
      text("당신은 세계와 밀접한 관계를 유지하며", 1155, 350);
      text("얼기설기 뻗어나가고 있는 사람 같습니다.", 1155, 370);
    } else if (countC_1 >= maxQ1) {
      text("꼿꼿하게 솟아난 선인장:", 1155, 240);
      text("당신의 손끝으로 느낀", 1155, 260);
      text("촉각 기억에 따라", 1155, 280);
      text("이 모양이 결정됩니다.", 1155, 300);
      text("꼿꼿하게 솟아난", 1155, 320);
      text("선인장의 모양처럼,", 1155, 340);
      text("당신은 강인함과 차분함을 지니고", 1155, 360);
      text("하늘을 향해 굳건히 서있는 사람 같습니다.", 1155, 380);
    } else if (countD_1 >= maxQ1) {
      text("바람에 살랑이는 꽃잎:", 1155, 240);
      text("당신의 손끝으로 느낀", 1155, 260);
      text("촉각 기억에 따라", 1155, 280);
      text("이 모양이 결정됩니다.", 1155, 300);
      text("바람에 살랑이는", 1155, 320);
      text("꽃잎의 움직임처럼,", 1155, 340);
      text("당신은 유연하고 상쾌한 몸짓으로", 1155, 360);
      text("세계를 받아들이는 사람 같습니다.", 1155, 380);
    } else if (countE_1 >= maxQ1) {
      text("나지막한 이끼:", 1155, 240);
      text("당신의 손끝으로 느낀", 1155, 260);
      text("촉각 기억에 따라", 1155, 280);
      text("이 모양이 결정됩니다.", 1155, 300);
      text("나지막한 이끼의 분포처럼,", 1155, 320);
      text("당신은 따스한 온도를 지니고서", 1155, 340);
      text("세계에 조용한 생명력을", 1155, 360);
      text("불어넣는 사람 같습니다.", 1155, 380);
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
    rect(560, 515, 280, 100);
    rect(860, 515, 320, 100);
    textAlign(CENTER);
    textSize(13);
    textFont(font2);
    text("내면 깊숙한 곳을 감싸고 있는 당신의 감정 상태는 어떠한가요?", 560, 480);
    text("그 미묘한 감정들이,", 560, 505);
    text("당신이 사랑하는 계절의 빛깔과 만나", 560, 525);
    text("티켓의 배경색으로 표현되었을 겁니다.", 560, 545);
    if (countA_2 >= maxQ2) {
      text("매끈한 조약돌:", 860, 475);
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라", 860, 495);
      text("티켓의 질감이 표현될 것입니다.", 860, 515);
      text("반복된 물결로 잘 다듬어진 조약돌처럼,", 860, 535);
      text("당신은 매끈하고 넉살좋게 외부의 향기를 받아들이는 것 같습니다.", 860, 555);
    } else if (countB_2 >= maxQ2) {
      text("까끌한 모래:", 860, 475);
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라", 860, 495);
      text("티켓의 질감이 표현될 것입니다.", 860, 515);
      text("당신은 까끌거리는 모래처럼", 860, 535);
      text("세밀하고 민감하게 외부의 향기를 받아들이는 것 같습니다.", 860, 555);
    } else if (countC_2 >= maxQ2) {
      text("거친 나무:", 860, 475);
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라", 860, 490);
      text("티켓의 질감이 표현될 것입니다.", 860, 505);
      text("당신은 거칠한 나무처럼", 860, 520);
      text("격한 바람 속에서도 쉽게 흔들리지 않고 묵묵히 한 자리를 지키며,", 860, 535);
      text("외부의 향기를 천천히 그러나 깊이 받아들이는 것 같습니다.", 860, 550);
    } else if (countD_2 >= maxQ2) {
      text("흐르는 물결:", 860, 475);
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라", 860, 495);
      text("티켓의 질감이 표현될 것입니다.", 860, 515);
      text("당신은 당신은 외부의 향기를,", 860, 535);
      text("흐르는 물결처럼 자연스럽고 풍성하게 받아들이는 것 같습니다.", 860, 555);
    } else if (countE_2 >= maxQ2) {
      text("반짝이는 별:", 860, 475);
      text("당신이 세상에서 비롯되는 갖가지 향기를 어떻게 인지하는가에 따라", 860, 490);
      text("티켓의 질감이 표현될 것입니다.", 860, 505);
      text("당신은 제각기 반짝이는 별들처럼,", 860, 520);
      text("개성넘치고 톡톡 튀는 방식으로", 860, 535);
      text("외부의 향기를 받아들이는 것 같습니다.", 860, 535);
    }
  }
}



