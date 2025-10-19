let captchaValue = null;

const generateCaptchaHandler = (canvasRef) => {
  if (typeof window !== "undefined") {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    window.devicePixelRatio = 2;
    initializeCaptcha(ctx);
  }
};

const initializeCaptcha = (ctx) => {
  captchaValue = generateCaptchaText();
  drawCaptchaOnCanvas(ctx, captchaValue);
};

const generateCaptchaText = () => {
  let captcha = "";
  for (let i = 0; i < 2; i++) {
    captcha += generateRandomChar(65, 90);
    captcha += generateRandomChar(97, 122);
    captcha += generateRandomChar(48, 57);
  }
  return captcha
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

const drawCaptchaOnCanvas = (ctx, captcha) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const textColors = [
    "rgb(255, 255, 255)",
    "rgb(0, 0, 0)",
    "rgb(41, 245, 235)",
  ];
  const length = captcha.length;
  const letterSpace = 400 / length;


  for (let i = 0; i < length; i++) {
    const xInitialSpace = 20;
    ctx.fillStyle = textColors[Math.floor(Math.random() * 3)];
    ctx.font = "35px Henny Penny, cursive";
    ctx.fillText(
      captcha[i],
      xInitialSpace + i * letterSpace,
      Math.floor(Math.random() * 15 + 42),
      100
    );
  }
};

const generateRandomChar = (min, max) =>
  String.fromCharCode(Math.floor(Math.random() * (max - min + 1) + min));

export { generateCaptchaHandler, captchaValue };
