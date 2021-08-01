import './vendor.css';
import './App.css';
import Layout, { Content, Header } from 'antd/lib/layout/layout';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheckSquare,
  faCoffee,
  faChalkboard,
  faNetworkWired,
  faQuestion,
  faBook,
  faExclamation,
  faKeyboard,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faPuzzlePiece,
} from '@fortawesome/free-solid-svg-icons'
import CommonUtils, { DefaultProps, DrawerUtils, LetterToDrawerMap } from './shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Divider, Row, Form, Input, List, Typography, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import setText from './features/workflow/action';
import Paragraph from 'antd/lib/typography/Paragraph';

library.add(faCheckSquare,
  faCoffee,
  faChalkboard,
  faNetworkWired,
  faQuestion,
  faBook,
  faExclamation,
  faKeyboard,
  faPlus,
  faCheckCircle,
  faTimesCircle,
  faPuzzlePiece,
)

function FormDetails(props: DefaultProps) {
  const [form] = Form.useForm<{ text: string }>();

  useEffect(() => {
    form.setFieldsValue({
      text: props.workflows.text
    })
  }, [form, props.workflows.text])

  return <Form layout="vertical" form={form} onValuesChange={(_, v) => props.dispatch(setText(v.text))}>
    <Form.Item label={<>
      <span>Your text (</span><Typography.Link className="small" href="#how-to-use">How to use</Typography.Link><span>):</span>
    </>
    } name="text">
      <Input placeholder="input placeholder" />
    </Form.Item>
  </Form>
}

function Canvas(props: DefaultProps & { width: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const width = props.width
  useEffect(() => {
    if (!ref || !ref.current) return;
    const context = ref.current.getContext("2d")
    if (!context) return;
    context.clearRect(0, 0, width, width)
    context.strokeStyle = "#111120"
    const words = CommonUtils.syllableSplitter(props.workflows.text)
    const cols = words.length
    for (let col = 0; col < cols; col++) {
      const syllables = words[col]
      if (syllables.length) DrawerUtils.horizontalBase(context, col + 1, cols, 0, width)
      for (let row = 0; row < syllables.length; row++) {
        const syllable = syllables[row]
        const consonant = syllable.slice(0, 1) as keyof LetterToDrawerMap
        const verticalDrawer = DrawerUtils.DRAWER[consonant]
        if (!verticalDrawer) {
          context.strokeStyle = "maroon"
          DrawerUtils.verticalBase(context, col, cols, row, width)
          context.strokeStyle = "#111120"
        } else {
          verticalDrawer(context, col, cols, row, width)
        }

        const vowel = syllable.slice(1) as keyof LetterToDrawerMap
        const horizontalDrawer = DrawerUtils.DRAWER[vowel]
        if (!horizontalDrawer) {
          DrawerUtils.horizontalBase(context, col + 1, cols, row + 1, width)
        } else {
          horizontalDrawer(context, col, cols, row, width)
        }
      }
      const previousLength = words[col - 1] && words[col - 1].length
      const currentLength = words[col].length
      if (words[col - 1] && (previousLength - currentLength) > 0) {
        const diff = previousLength - currentLength
        for (let row = currentLength; row < currentLength + diff; row++) {
          DrawerUtils.verticalBase(context, col, cols, row, width)
        }
      }
    }

    const lastRow = words[words.length - 1]
    for (let row = 0; row < lastRow.length; row++) {
      DrawerUtils.verticalBase(context, cols, cols, row, width)
    }
  }, [props.workflows.text, width])
  return <canvas style={{ width: "100%", height: "auto" }} ref={ref} width={width} height={width} />
}

function StaticCanvas(props: DefaultProps & { width?: number, draw: keyof LetterToDrawerMap, offset?: number }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const { width = 50, draw, offset = 0 } = props
  useEffect(() => {
    const drawUtil = DrawerUtils.DRAWER[draw]
    if (!drawUtil) {
      console.error("Cannot find draw function for letter", draw)
      return;
    }
    if (!ref || !ref.current) return;
    const context = ref.current.getContext("2d")
    if (!context) return;
    context.clearRect(0, 0, width, width)
    context.strokeStyle = "#111120"
    drawUtil(context, 0, 1 + offset, 0, width)
  }, [props.workflows.text, draw, width, offset])
  return <canvas ref={ref} width={3 * width} height={2 * width} />
}

class App extends React.Component<DefaultProps> {
  canvasRef?: React.Ref<HTMLCanvasElement>;

  render() {

    const words = CommonUtils.syllableSplitter(this.props.workflows.text)
    return (
      <div className="App">
        <Layout style={{ height: "100%" }}>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="big centered"><FontAwesomeIcon icon="puzzle-piece" width={20} />
              <span className="brand">
                <span className="red">J</span>
                <span className="orange">i</span>
                <span className="yellow">g</span>
                <span className="green">s</span>
                <span className="blue">a</span>
                <span className="purple">w</span>
              </span>
              Writer | <span className="thin">Write in Jigsaw Script</span>
              <a href="https://github.com/ye-yu/jigsaw-writer" style={{ marginLeft: 20 }}><Button ghost>Source</Button></a>
            </div>
          </Header>
          <Content className="content" style={{ marginTop: 100 }}>
            <Row gutter={24}>
              <Col span={24} sm={12}>
                <Title level={4}>Fill in your words!</Title>
                <FormDetails {...this.props} />
                <Title level={4}>Your syllables:</Title>
                <List style={{ marginBottom: 20 }} bordered dataSource={words} renderItem={item => <List.Item className="beans">
                  {item.map((e, i) => <span className={e.endsWith("!") && !e.endsWith("e!") ? "error" : ""} key={i}>{e.length === 1 ? (e + "-"): e}</span>)}
                </List.Item>} />
              </Col>
              <Col span={24} sm={12}>
                <Title level={4}>Jigsaw Output</Title>
                <Canvas {...this.props} width={(Math.max(600, words.length * DrawerUtils.GRAPH_HALF_WIDTH * 2.1))} />
              </Col>
            </Row>
          </Content>
          <Content className="content">
            <div id="how-to-use" style={{ transform: "translateY(-100px)" }} />
            <Title level={4}>How to use?</Title>
            <Paragraph>
              You can generally skip this and just type whatever letter you want, but since Jigsaw is especially for monosyllabic words, you can optionally transform your words into monosyllabic words:
            </Paragraph>
            <Paragraph>
              <ol>
                <li>Remove any symbols like !@#$% from the sentence.</li>
                <li>Replace any letter 'v' to letter 'b' because there is no letter for it yet.</li>
                <li>Replace any letter 'ng' to letter just 'n' because there is no letter for it yet.</li>
                <li>
                  Breakdown dipthongs by filling in 'y' or 'w':
                  <ol>
                    <li>For 'u-' (like 'ua' or 'ui'), insert the letter 'w'.</li>
                    <li>For 'o-' (like 'oa' or 'oi'), insert the letter 'w'.</li>
                    <li>For 'ao', 'au', 'eo', and 'eu', insert the letter 'w'.</li>
                    <li>For 'e-' (like 'ea' or 'ei'), insert the letter 'y'.</li>
                    <li>For 'e-' (like 'ea' or 'ei'), insert the letter 'y'.</li>
                    <li>For 'ai', 'ae', 'ei', and 'ee', insert the letter 'y'.</li>
                  </ol>
                </li>
                <li>
                  For languages that do not spell words based on how they are pronounced (like English), you need to translate each syllables into their pronunciation accordingly.
                  Refer to the <a href="#letter-list">letter list</a> below.
                </li>
              </ol>
            </Paragraph>
            <Paragraph>
              Here is an example of transformations of English words:
            </Paragraph>
            <List
              style={{ marginBottom: 10 }}
              bordered
              dataSource={[
                {
                  display: "bear -> beyer",
                  onClick: () => this.props.dispatch(setText("beyer"))
                },
                {
                  display: "coca cola -> koka kola",
                  onClick: () => this.props.dispatch(setText("koka kola"))
                },
                {
                  display: "spaghetti -> spageti",
                  onClick: () => this.props.dispatch(setText("spageti"))
                },
                {
                  display: "I like to drink -> ai layik tu drink",
                  onClick: () => this.props.dispatch(setText("ai layik tu drink"))
                },
              ]}
              renderItem={i => <a href="#top" onClick={i.onClick}><List.Item>{i.display}</List.Item></a>}
            />
            <Paragraph>
              Obviously, English is not suitable for Jigsaw because it is not a monosyllabic language.
              Therefore, a lot of compensations have to be done to make it compatible with the Jigsaw script.
            </Paragraph>
            <Paragraph>
              Check out other compensation for different languages <a href="#compensation">below</a>.
            </Paragraph>
            <Paragraph>
              <ol>
              </ol>
            </Paragraph>
            <Divider />
            <Title level={4}>What is Jigsaw Script?</Title>
            <Paragraph>
              Jigsaw Script is a <a href="https://neographilia.wordpress.com/writing-systems/#logosyllabary">logosyllabary</a> script to write words in Jigsaw. Here are the basic rules:
            </Paragraph>
            <Paragraph>
              <ol>
                <li>Words are grouped into columns.</li>
                <li>Writing order is from top to bottom, right to left.</li>
                <li>Consonants are placed at the right side of the Jigsaw</li>
                <li>Vowels are placed at the bottom side of the Jigsaw</li>
              </ol>
            </Paragraph>
            <Divider />
            <Title level={4}>What is Jigsaw Script for?</Title>
            <Paragraph>
              Jigsaw script is just mainly a hobby of mine, but from a linguistic perspective,
              Jigsaw is very suitable for monosyllabic language with little-to-no amount of dipthongs, e.g. ae, ou, etc.
            </Paragraph>
            <div id="letter-list" style={{ transform: "translateY(-100px)" }} />
            <Divider />
            <Title level={4}>What are the letters?</Title>
            Header note: the 'r' in 'roti' is rhottal. 'p' and 't' are not aspirated.
            <List
              bordered
              dataSource={[
                <Title level={5}>Consonants</Title>,
                <Row className="bordered-cols" gutter={12}>
                  <Col span={24} sm={12} md={6}><div><div>b (ball)</div><StaticCanvas {...this.props} draw="b" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>g (goal)</div><StaticCanvas {...this.props} draw="g" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>m (mole)</div><StaticCanvas {...this.props} draw="m" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>f (fall)</div><StaticCanvas {...this.props} draw="f" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>p (pita)</div><StaticCanvas {...this.props} draw="p" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>k (kek)</div><StaticCanvas {...this.props} draw="k" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>j (john)</div><StaticCanvas {...this.props} draw="j" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>r (roti)</div><StaticCanvas {...this.props} draw="r" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>d (doll)</div><StaticCanvas {...this.props} draw="d" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>h (hole)</div><StaticCanvas {...this.props} draw="h" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>n (none)</div><StaticCanvas {...this.props} draw="n" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>l (lawn)</div><StaticCanvas {...this.props} draw="l" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>t (tile)</div><StaticCanvas {...this.props} draw="t" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>? (glottal)</div><StaticCanvas {...this.props} draw="?" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>c (chair)</div><StaticCanvas {...this.props} draw="c" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>R (roll)</div><StaticCanvas {...this.props} draw="R" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>s (say)</div><StaticCanvas {...this.props} draw="s" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>z (zig)</div><StaticCanvas {...this.props} draw="z" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>w (wig)</div><StaticCanvas {...this.props} draw="w" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>y (yot)</div><StaticCanvas {...this.props} draw="y" /></div></Col>
                </Row>,
                <Title level={5}>Vowels</Title>,
                <Row className="bordered-cols" gutter={12}>
                  <Col span={24} sm={12} md={8}><div><div>a (aah)</div><StaticCanvas {...this.props} draw="a" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>o (oh)</div><StaticCanvas {...this.props} draw="o" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>e (<span style={{ transform: "rotate(180deg) translate(-10%,-21%)", display: "inline-block" }}>e</span>)</div><StaticCanvas {...this.props} draw="e" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>u (uwu)</div><StaticCanvas {...this.props} draw="u" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>e! (eh)</div><StaticCanvas {...this.props} draw="e!" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>i (iii)</div><StaticCanvas {...this.props} draw="i" offset={1} /></div></Col>
                  <Col span={24}><div><div>(silent/schwa)</div><StaticCanvas {...this.props} draw="silent" offset={1} /></div></Col>
                </Row>,
              ]}
              renderItem={i => <List.Item>{i}</List.Item>}
            />
            <Divider />
            <div id="compensation" style={{ transform: "translateY(-100px)" }} />
            <Title level={4}>Hawaiian Language</Title>
            <Paragraph>
              Hawaiian is a monosyllabic language, and the glottal letter in Jigsaw is a great feature to use in Hawaiian
              However, the lack of dipthongs in Jigsaw makes it slightly harder to use.
              Luckily, the workaround breaking down dipthongs using 'y' and 'w' is usually sufficient to compensate for the lack of dipthongs in Jigsaw.
            </Paragraph>
            <Paragraph>
              Here are a few examples:
            </Paragraph>
            <List
              style={{ marginBottom: 10 }}
              bordered
              dataSource={[
                {
                  display: "Aloha -> Aloha",
                  onClick: () => this.props.dispatch(setText("Aloha"))
                },
                {
                  display: "Aloha Kakahiaka -> Aloha Kakahiyaka",
                  onClick: () => this.props.dispatch(setText("Aloha Kakahiyaka"))
                },
                {
                  display: "Kokua -> Kokuwa",
                  onClick: () => this.props.dispatch(setText("Kokuwa"))
                },
                {
                  display: "Keiki -> Ke!yiki",
                  onClick: () => this.props.dispatch(setText("Ke!yiki"))
                },
                {
                  display: "Aloha ʻoe -> Aloha Owe",
                  onClick: () => this.props.dispatch(setText("Aloha Owe"))
                },
              ]}
              renderItem={i => <a href="#top" onClick={i.onClick}><List.Item>{i.display}</List.Item></a>}
            />
            <div className="footnote">Examples are taken from <a href="https://www.hawaii.com/discover/learn-to-speak-hawaiian/">Learn to Speak Hawaiian | Hawaii.com</a></div>
            <Divider />
            <Title level={4}>Malay/Indonesian Language</Title>
            <Paragraph>
              Another language is the almost monosyllabic is Malay/Indonesian language.
              The first compensation to do is that the final consonant 'ng' is replaced with the letter R (double pointy left).
              This is because this language originally has no rolled R as their consonants and Jigsaw is lacking the final consonant 'ng' for this language.
            </Paragraph>
            <Paragraph>
              Moreover, consonant clusters are broken down into their own syllables using the schwa. Below are the examples:
            </Paragraph>
            <List
              style={{ marginBottom: 10 }}
              bordered
              dataSource={[
                {
                  display: "Sayang -> SayaR",
                  onClick: () => this.props.dispatch(setText("SayaR"))
                },
                {
                  display: "Kerajaan -> Keraja?an",
                  onClick: () => this.props.dispatch(setText("Keraja?an"))
                },
                {
                  display: "Strategi -> S-t-rategi",
                  onClick: () => this.props.dispatch(setText("S-t-rategi"))
                },
                {
                  display: "Simpan -> Sim-pan-",
                  onClick: () => this.props.dispatch(setText("Sim-pan-"))
                },
                {
                  display: "Keluarga -> Keluwar-ga",
                  onClick: () => this.props.dispatch(setText("Keluwar-ga"))
                },
                {
                  display: "Saya mencintai kamu -> saya men-cin-ta?i kamu",
                  onClick: () => this.props.dispatch(setText("saya men-cin-ta?i kamu"))
                },
              ]}
              renderItem={i => <a href="#top" onClick={i.onClick}><List.Item>{i.display}</List.Item></a>}
            />

          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect(CommonUtils.mapStatesToProps)(App);
