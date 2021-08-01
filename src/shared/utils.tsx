import { WorkflowState } from "../features/workflow/reducer";

const splitRegex = /([aeiou]|R[aeiou]?|\?[aeiou]?|[^aeiou][aeiou]?)(!?)/g

export default class CommonUtils {
  static mapStatesToProps(states: {[a:string]:any}) {
    return {
      workflows: states.workflows as WorkflowState
    }
  }

  static readonly syllableSplitter = (word: string) => word.replace(/[^a-z?! ]gi/, '')
  .replace(/[^r]/gi, function(e){return e.toLocaleLowerCase("en-gb")})
  .split(' ')
  .map(e => e
    .split(splitRegex)
    .filter(e => e.length)
    .reduce((a, b, i, arr) => {
      const vowelsOnly = new Set(["a", "e", "i", "o", "u"])
      if (b === "!") return a;
      if (arr[i + 1] === "!") {
        a.push(vowelsOnly.has(b) ? ("?" + b + "!") : (b + "!"))
      }
      else a.push(vowelsOnly.has(b)? ("?" + b) : b)
      return a
    }, [] as string[])
  )
}

export type DefaultProps = {
  workflows: WorkflowState
  dispatch: (a: any) => void
}

export type DrawerFunction = (ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) => void

export type LetterToDrawerMap = {
  "b": DrawerFunction
  "g": DrawerFunction
  "m": DrawerFunction
  "f": DrawerFunction
  "s": DrawerFunction
  "p": DrawerFunction
  "k": DrawerFunction
  "j": DrawerFunction
  "r": DrawerFunction
  "z": DrawerFunction
  "d": DrawerFunction
  "h": DrawerFunction
  "n": DrawerFunction
  "l": DrawerFunction
  "w": DrawerFunction
  "t": DrawerFunction
  "?": DrawerFunction
  "c": DrawerFunction
  "R": DrawerFunction
  "y": DrawerFunction
  "a": DrawerFunction
  "o": DrawerFunction
  "e!":DrawerFunction
  "u": DrawerFunction
  "e": DrawerFunction
  "i": DrawerFunction
  undefined: undefined
}

export class DrawerUtils {
  static readonly GRAPH_HALF_WIDTH = 48;
  static readonly GRAPH_HALF_HEIGHT = 35;
  static readonly GRAPH_STROKE_WIDTH = 3;
  static readonly GRAPH_CURVE_HEIGHT = 12;
  static readonly GRAPH_CURVE_WIDTH = 24;
  static readonly MARGIN_TOP = 12;

  static readonly DRAWER: LetterToDrawerMap = {
    "b": DrawerUtils.b,
    "g": DrawerUtils.g,
    "m": DrawerUtils.m,
    "f": DrawerUtils.f,
    "p": DrawerUtils.p,
    "k": DrawerUtils.k,
    "j": DrawerUtils.j,
    "r": DrawerUtils.r,
    "d": DrawerUtils.d,
    "h": DrawerUtils.h,
    "n": DrawerUtils.n,
    "l": DrawerUtils.l,
    "t": DrawerUtils.t,
    "?": DrawerUtils.glottal,
    "c": DrawerUtils.c,
    "R": DrawerUtils.R,
    "s": DrawerUtils.s,
    "z": DrawerUtils.z,
    "w": DrawerUtils.w,
    "y": DrawerUtils.y,
    "a": DrawerUtils.a,
    "o": DrawerUtils.o,
    "e!": DrawerUtils["e!"],
    "u": DrawerUtils.u,
    "e": DrawerUtils.e,
    "i": DrawerUtils.i,
    undefined: undefined,
  }
  static debugDraw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    DrawerUtils.horizontalBaseSpan(ctx, 5, 0, width)
    DrawerUtils.b(ctx, 0, 5, 0, width)
    DrawerUtils.g(ctx, 1, 5, 0, width)
    DrawerUtils.m(ctx, 2, 5, 0, width)
    DrawerUtils.f(ctx, 3, 5, 0, width)
    DrawerUtils.s(ctx, 4, 5, 0, width)
    DrawerUtils.horizontalBaseSpan(ctx, 5, 1, width)
    DrawerUtils.p(ctx, 0, 5, 1, width)
    DrawerUtils.k(ctx, 1, 5, 1, width)
    DrawerUtils.j(ctx, 2, 5, 1, width)
    DrawerUtils.r(ctx, 3, 5, 1, width)
    DrawerUtils.z(ctx, 4, 5, 1, width)
    DrawerUtils.horizontalBaseSpan(ctx, 5, 2, width)
    DrawerUtils.d(ctx, 0, 5, 2, width)
    DrawerUtils.h(ctx, 1, 5, 2, width)
    DrawerUtils.n(ctx, 2, 5, 2, width)
    DrawerUtils.l(ctx, 3, 5, 2, width)
    DrawerUtils.w(ctx, 4, 5, 2, width)
    DrawerUtils.horizontalBaseSpan(ctx, 5, 3, width)
    DrawerUtils.t(ctx, 0, 5, 3, width)
    DrawerUtils.glottal(ctx, 1, 5, 3, width)
    DrawerUtils.c(ctx, 2, 5, 3, width)
    DrawerUtils.R(ctx, 3, 5, 3, width)
    DrawerUtils.y(ctx, 4, 5, 3, width)
    DrawerUtils.horizontalBaseSpan(ctx, 5, 4, width)
  }

  static verticalBase(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    const x = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const y = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x, y + 2 * DrawerUtils.GRAPH_HALF_HEIGHT)
    ctx.lineWidth = DrawerUtils.GRAPH_STROKE_WIDTH
    ctx.stroke()
  }

  static horizontalBase(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    const x = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const y = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 2 * DrawerUtils.GRAPH_HALF_WIDTH, y)
    ctx.lineWidth = DrawerUtils.GRAPH_STROKE_WIDTH
    ctx.stroke()
  }

  static horizontalBaseSpan(ctx: CanvasRenderingContext2D, cols: number, row: number, width: number) {
    const x = width / 2 - cols * DrawerUtils.GRAPH_HALF_WIDTH;
    const y = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 2 * cols * DrawerUtils.GRAPH_HALF_WIDTH + 1, y)
    ctx.lineWidth = DrawerUtils.GRAPH_STROKE_WIDTH
    ctx.stroke()
  }

  static b(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedMiddle(ctx, col, cols, row, width, true)
  }

  static d(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedMiddle(ctx, col, cols, row, width, false)
  }

  static roundedMiddle(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - curveHeight / 2
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      curveHeight
    )
    const xOff = 2
    const curveStartX = startX + xOff
    ctx.beginPath();
    ctx.moveTo(right ? curveStartX : (curveStartX + 1), startY);
    ctx.bezierCurveTo((right ? 21 : -21) + curveStartX, -18 + startY, (right ? 17 : -17) + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
    ctx.stroke();
  }

  static g(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedBottom(ctx, col, cols, row, width, true)
  }

  static h(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedBottom(ctx, col, cols, row, width, false)
  }

  static roundedBottom(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + 2 * DrawerUtils.GRAPH_HALF_HEIGHT - DrawerUtils.GRAPH_CURVE_HEIGHT - 2
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      DrawerUtils.GRAPH_CURVE_HEIGHT
    )
    const xOff = 2
    const curveStartX = startX + xOff
    ctx.beginPath();
    ctx.moveTo(right ? curveStartX : (curveStartX + 1), startY);
    ctx.bezierCurveTo((right ? 21 : -21) + curveStartX, -18 + startY, (right ? 17 : -17) + curveStartX, 21 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
    ctx.stroke();
  }

  static m(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedTop(ctx, col, cols, row, width, true)
  }

  static n(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedTop(ctx, col, cols, row, width, false)
  }

  static roundedTop(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + 2
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      DrawerUtils.GRAPH_CURVE_HEIGHT
    )
    const xOff = 2
    const curveStartX = startX + xOff
    ctx.beginPath();
    ctx.moveTo(right ? curveStartX : (curveStartX + 1), startY - 2);
    ctx.bezierCurveTo((right ? 21 : -21) + curveStartX, -2 + startY, (right ? 17 : -17) + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
    ctx.stroke();
  }

  static f(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedDouble(ctx, col, cols, row, width, true)
  }

  static l(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedDouble(ctx, col, cols, row, width, false)
  }

  static roundedDouble(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH 
    {
      const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT / 2 - curveHeight / 2 + 2
      ctx.clearRect(
        startX,
        startY,
        2 * DrawerUtils.GRAPH_STROKE_WIDTH,
        curveHeight
      )
      const xOff = 2
      const curveStartX = startX + xOff
      ctx.beginPath();
      ctx.moveTo(right ? curveStartX : (curveStartX + 1), startY);
      ctx.bezierCurveTo((right ? 21 : -21) + curveStartX, -18 + startY, (right ? 17 : -17) + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
      ctx.stroke();
    }

    {
      const startY = baseY + 3 * DrawerUtils.GRAPH_HALF_HEIGHT / 2 - curveHeight / 2 - 2
      ctx.clearRect(
        startX,
        startY,
        2 * DrawerUtils.GRAPH_STROKE_WIDTH,
        curveHeight
      )
      const xOff = 2
      const curveStartX = startX + xOff
      ctx.beginPath();
      ctx.moveTo(right ? curveStartX : (curveStartX + 1), startY);
      ctx.bezierCurveTo((right ? 21 : -21) + curveStartX, -18 + startY, (right ? 17 : -17) + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
      ctx.stroke();
    }
  }

  static s(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH 
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT / 2
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      2.5 * curveHeight
    )
    {
      const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH 
      const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT / 2
      const xOff = 2
      const curveStartX = startX + xOff
      ctx.beginPath();
      ctx.moveTo(curveStartX, startY + 1);
      ctx.bezierCurveTo(21 + curveStartX, -18 + startY, 17 + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
    }

    {
      const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH + 2
      const startY = baseY + 3 * DrawerUtils.GRAPH_HALF_HEIGHT / 2 - curveHeight * 1.6
      const xOff = 2
      const curveStartX = startX + xOff
      ctx.bezierCurveTo(-21 + curveStartX, -18 + startY, -17 + curveStartX, 29 + startY, curveStartX, DrawerUtils.GRAPH_CURVE_HEIGHT + startY + 1);
      ctx.stroke();
    }
  }

  static w(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedInverted(ctx, col, cols, row, width, true)
  }

  static y(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedInverted(ctx, col, cols, row, width, false)
  }

  static roundedInverted(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 2.5;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - curveHeight / 2

    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      curveHeight
    )

    ctx.beginPath();
    if (right) {
      ctx.moveTo(startX + 2, startY)
      ctx.lineTo(startX + 2 + curveHeight * 0.5, startY)
    } else {
      ctx.moveTo(startX + 3, startY)
      ctx.lineTo(startX + 3 - curveHeight * 0.5, startY)
    }

    if (right) {
      ctx.moveTo(startX + 2, startY + curveHeight)
      ctx.lineTo(startX + 2 + curveHeight * 0.5, startY + curveHeight)
    } else {
      ctx.moveTo(startX + 3, startY + curveHeight)
      ctx.lineTo(startX + 3 - curveHeight * 0.5, startY + curveHeight)
    }

    if (right) {
      const curveStartX = startX + 2 + curveHeight * 0.5
      const curveStartY = startY
      ctx.moveTo(curveStartX, curveStartY)
      ctx.bezierCurveTo(curveStartX - curveHeight * 0.5, curveStartY, curveStartX - curveHeight * 0.5, curveStartY + curveHeight, startX + 2 + curveHeight * 0.5, startY + curveHeight)
    } else {
      const curveStartX = startX + 3 - curveHeight * 0.5
      const curveStartY = startY
      ctx.moveTo(curveStartX, curveStartY)
      ctx.bezierCurveTo(curveStartX + curveHeight * 0.5, curveStartY, curveStartX + curveHeight * 0.5, curveStartY + curveHeight, startX + 3 - curveHeight * 0.5, startY + curveHeight)
    }
    ctx.stroke();
  }

  static p(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyMiddle(ctx, col, cols, row, width, true)
  }

  static t(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyMiddle(ctx, col, cols, row, width, false)
  }

  static pointyMiddle(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 1.75;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - curveHeight / 2
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      curveHeight
    )
    const pointyEnd = right ? (startX + curveHeight * 0.75) : (startX - curveHeight * 0.75)
    ctx.beginPath()
    ctx.moveTo(startX + 3, startY)
    ctx.lineTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.lineTo(startX + 3, startY + curveHeight + 1)
    ctx.stroke()
  }

  static k(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyBottom(ctx, col, cols, row, width, true)
  }

  static glottal(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyBottom(ctx, col, cols, row, width, false)
  }

  static pointyBottom(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 1.75;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT + 0.65 * curveHeight - 3
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      curveHeight
    )
    const pointyEnd = right ? (startX + curveHeight * 0.75) : (startX - curveHeight * 0.75)
    ctx.beginPath()
    ctx.moveTo(startX + 3, startY)
    ctx.lineTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.lineTo(startX + 3, startY + curveHeight + 1)
    ctx.stroke()
  }

  static j(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyTop(ctx, col, cols, row, width, true)
  }

  static c(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyTop(ctx, col, cols, row, width, false)
  }

  static pointyTop(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 1.75;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - 1.65 * curveHeight + 3
    ctx.clearRect(
      startX,
      startY,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      curveHeight
    )
    const pointyEnd = right ? (startX + curveHeight * 0.75) : (startX - curveHeight * 0.75)
    ctx.beginPath()
    ctx.moveTo(startX + 3, startY)
    ctx.lineTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointyEnd, startY + curveHeight / 2 + 1)
    ctx.lineTo(startX + 3, startY + curveHeight + 1)
    ctx.stroke()
  }

  static r(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyDouble(ctx, col, cols, row, width, true)
  }

  static R(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointyDouble(ctx, col, cols, row, width, false)
  }

  static pointyDouble(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, right = true) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 1.75;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    {
      const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - 1.25 * curveHeight + 3
      ctx.clearRect(
        startX,
        startY,
        2 * DrawerUtils.GRAPH_STROKE_WIDTH,
        curveHeight
      )
      const pointyEnd = right ? (startX + curveHeight * 0.75) : (startX - curveHeight * 0.75)
      ctx.beginPath()
      ctx.moveTo(startX + 3, startY)
      ctx.lineTo(pointyEnd, startY + curveHeight / 2 + 1)
      ctx.stroke()
  
      ctx.beginPath()
      ctx.moveTo(pointyEnd, startY + curveHeight / 2 + 1)
      ctx.lineTo(startX + 3, startY + curveHeight + 1)
      ctx.stroke()
    }
    {
      const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT
      ctx.clearRect(
        startX,
        startY,
        2 * DrawerUtils.GRAPH_STROKE_WIDTH,
        curveHeight
      )
      const pointyEnd = right ? (startX + curveHeight * 0.75) : (startX - curveHeight * 0.75)

      ctx.beginPath()
      ctx.moveTo(startX + 3, startY)
      ctx.lineTo(pointyEnd, startY + curveHeight / 2 + 1)
      ctx.stroke()
  
      ctx.beginPath()
      ctx.moveTo(pointyEnd, startY + curveHeight / 2 + 1)
      ctx.lineTo(startX + 3, startY + curveHeight + 1)
      ctx.stroke()
    }
  }

  static z(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.verticalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const curveHeight = DrawerUtils.GRAPH_CURVE_HEIGHT * 1.75;
    const startX = baseX - DrawerUtils.GRAPH_STROKE_WIDTH
    const startY = baseY + DrawerUtils.GRAPH_HALF_HEIGHT - curveHeight + 2
    ctx.clearRect(
      startX,
      startY + 2,
      2 * DrawerUtils.GRAPH_STROKE_WIDTH,
      1.5 * curveHeight
    )
    ctx.beginPath()
    ctx.moveTo(startX + 2, startY)
    ctx.lineTo(startX + curveHeight, startY)
    ctx.lineTo(startX - curveHeight + 3, startY + 1.5 * curveHeight + 3)
    ctx.lineTo(startX + 4, startY + 1.5 * curveHeight + 3)
    ctx.stroke()
  }

  static a(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedMiddleUpDown(ctx, col + 1, cols, row + 1, width, true)
  }

  static o(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.roundedMiddleUpDown(ctx, col + 1, cols, row + 1, width, false)
  }

  static roundedMiddleUpDown(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, upside = true) {
    DrawerUtils.horizontalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX + DrawerUtils.GRAPH_HALF_WIDTH - DrawerUtils.GRAPH_CURVE_WIDTH / 2
    const startY = baseY;

    ctx.clearRect(
      startX,
      startY - DrawerUtils.GRAPH_STROKE_WIDTH / 2 - 1,
      DrawerUtils.GRAPH_CURVE_WIDTH,
      DrawerUtils.GRAPH_STROKE_WIDTH + 2,
    )

    const curveStartX = startX + 1
    const curveStartY = upside ? (startY + 1) : (startY - 1)
    const curveEndX = curveStartX + DrawerUtils.GRAPH_CURVE_WIDTH - 3
    const curveEndY = curveStartY
    ctx.beginPath()
    ctx.moveTo(curveStartX, curveStartY)
    ctx.bezierCurveTo(
      curveStartX - 12,
      curveStartY + (upside ? -18 : 18),
      curveEndX + 12,
      curveEndY + (upside ? -21 : 21),
      curveEndX,
      curveEndY)
    ctx.stroke()
  }

  static "e!"(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointYMiddleUpDown(ctx, col + 1, cols, row + 1, width, true)
  }

  static u(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    DrawerUtils.pointYMiddleUpDown(ctx, col + 1, cols, row + 1, width, false)
  }

  static pointYMiddleUpDown(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number, upside = true) {
    DrawerUtils.horizontalBase(ctx, col, cols, row, width)
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX + DrawerUtils.GRAPH_HALF_WIDTH - DrawerUtils.GRAPH_CURVE_WIDTH / 2
    const startY = baseY;

    ctx.clearRect(
      startX,
      startY - DrawerUtils.GRAPH_STROKE_WIDTH / 2 - 1,
      DrawerUtils.GRAPH_CURVE_WIDTH,
      DrawerUtils.GRAPH_STROKE_WIDTH + 2,
    )

    const curveHalfWidth = DrawerUtils.GRAPH_CURVE_WIDTH / 2

    const pointStartX = startX
    const pointStartY = upside ? (startY + 1) : (startY - 1)
    const pointMiddleX = pointStartX + curveHalfWidth
    const pointMiddleY = pointStartY + (upside ? -curveHalfWidth : curveHalfWidth)
    const pointEndX = pointStartX + DrawerUtils.GRAPH_CURVE_WIDTH
    const pointEndY = pointStartY

    ctx.beginPath()
    ctx.moveTo(pointStartX, pointStartY)
    ctx.lineTo(pointMiddleX, pointMiddleY)
    ctx.lineTo(pointEndX, pointEndY)
    ctx.stroke()
  }

  static e(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    col++;
    row++;
    DrawerUtils.horizontalBase(ctx, col, cols, row, width)
    const curveWidth = DrawerUtils.GRAPH_CURVE_WIDTH
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX + DrawerUtils.GRAPH_HALF_WIDTH - curveWidth
    const startY = baseY;
    ctx.clearRect(
      startX,
      startY - DrawerUtils.GRAPH_STROKE_WIDTH / 2 - 1,
      2 * curveWidth - 2,
      DrawerUtils.GRAPH_STROKE_WIDTH + 2,
    )

    function curve(upside: boolean, offset: number) {
      const curveStartX = startX + 1 + offset
      const curveStartY = upside ? (startY + 1) : (startY - 1)
      const curveEndX = curveStartX + DrawerUtils.GRAPH_CURVE_WIDTH - 3
      const curveEndY = curveStartY
      ctx.moveTo(curveStartX, curveStartY)
      ctx.bezierCurveTo(
        curveStartX - 12,
        curveStartY + (upside ? -18 : 18),
        curveEndX + 12,
        curveEndY + (upside ? -21 : 21),
        curveEndX,
        curveEndY)
    }
    ctx.beginPath()
    curve(false, 0)
    curve(true, DrawerUtils.GRAPH_CURVE_WIDTH - 2)
    ctx.stroke()
  }

  static i(ctx: CanvasRenderingContext2D, col: number, cols: number, row: number, width: number) {
    col++;
    row++;
    DrawerUtils.horizontalBase(ctx, col, cols, row, width)
    const curveWidth = DrawerUtils.GRAPH_CURVE_WIDTH
    const curveHalfWidth = DrawerUtils.GRAPH_CURVE_WIDTH / 2
    const baseX = width / 2 + ((cols - 2 * col) * DrawerUtils.GRAPH_HALF_WIDTH);
    const baseY = 2 * row * DrawerUtils.GRAPH_HALF_HEIGHT + DrawerUtils.MARGIN_TOP;
    const startX = baseX + DrawerUtils.GRAPH_HALF_WIDTH - curveWidth
    const startY = baseY;
    ctx.clearRect(
      startX,
      startY - DrawerUtils.GRAPH_STROKE_WIDTH / 2 - 1,
      2 * curveWidth - 2,
      DrawerUtils.GRAPH_STROKE_WIDTH + 2,
    )
    const pointStartX = startX
    const pointStartY = startY
    const pointMiddleX = pointStartX + curveHalfWidth
    const pointMiddleY = pointStartY + curveHalfWidth
    const pointSecondMiddleX = pointMiddleX + curveWidth
    const pointSecondMiddleY = pointMiddleY - curveWidth
    const pointEndX = pointSecondMiddleX + curveHalfWidth
    const pointEndY = pointStartY

    ctx.beginPath()
    ctx.moveTo(pointStartX, pointStartY)
    ctx.lineTo(pointMiddleX, pointMiddleY)
    ctx.lineTo(pointSecondMiddleX, pointSecondMiddleY)
    ctx.lineTo(pointEndX, pointEndY)
    ctx.stroke()
  }
}