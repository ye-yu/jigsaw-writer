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
                <Divider />
                <FormDetails {...this.props} />
                <Divider />
                <Title level={4}>Your syllables:</Title>
                <List bordered dataSource={words} renderItem={item => <List.Item className="beans">
                  {item.map((e, i) => <span className={e.endsWith("!") && !e.endsWith("e!") ? "error" : ""} key={i}>{e}</span>)}
                </List.Item>} />
              </Col>
              <Col span={24} sm={12}>
                <Title level={4}>Jigsaw Output</Title>
                <Canvas {...this.props} width={(Math.max(600, words.length * DrawerUtils.GRAPH_HALF_WIDTH * 2.1))} />
              </Col>
            </Row>
          </Content>
          <Content className="content">
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
            <Divider />
            <Title level={4}>What are the letters?</Title>
            <List
              bordered
              dataSource={[
                <Title level={5}>Consonants</Title>,
                <Row className="bordered-cols" gutter={12}>
                  <Col span={24} sm={12} md={6}><div><div>b</div><StaticCanvas {...this.props} draw="b" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>g</div><StaticCanvas {...this.props} draw="g" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>m</div><StaticCanvas {...this.props} draw="m" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>f</div><StaticCanvas {...this.props} draw="f" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>p</div><StaticCanvas {...this.props} draw="p" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>k</div><StaticCanvas {...this.props} draw="k" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>j</div><StaticCanvas {...this.props} draw="j" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>r</div><StaticCanvas {...this.props} draw="r" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>d</div><StaticCanvas {...this.props} draw="d" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>h</div><StaticCanvas {...this.props} draw="h" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>n</div><StaticCanvas {...this.props} draw="n" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>l</div><StaticCanvas {...this.props} draw="l" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>t</div><StaticCanvas {...this.props} draw="t" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>?</div><StaticCanvas {...this.props} draw="?" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>c</div><StaticCanvas {...this.props} draw="c" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>R</div><StaticCanvas {...this.props} draw="R" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>s</div><StaticCanvas {...this.props} draw="s" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>z</div><StaticCanvas {...this.props} draw="z" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>w</div><StaticCanvas {...this.props} draw="w" /></div></Col>
                  <Col span={24} sm={12} md={6}><div><div>y</div><StaticCanvas {...this.props} draw="y" /></div></Col>
                </Row>,
                <Title level={5}>Vowels</Title>,
                <Row className="bordered-cols" gutter={12}>
                  <Col span={24} sm={12} md={8}><div><div>a</div><StaticCanvas {...this.props} draw="a" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>o</div><StaticCanvas {...this.props} draw="o" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>e</div><StaticCanvas {...this.props} draw="e" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>u</div><StaticCanvas {...this.props} draw="u" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>e!</div><StaticCanvas {...this.props} draw="e!" offset={1} /></div></Col>
                  <Col span={24} sm={12} md={8}><div><div>i</div><StaticCanvas {...this.props} draw="i" offset={1} /></div></Col>
                </Row>,
              ]}
              renderItem={i => <List.Item>{i}</List.Item>}
            />
            <div id="how-to-use" />
            <Divider />
            <Title level={4}>How to use?</Title>
            <Paragraph>
              Before using this tool, you need to remove non-supported letters from the target sentence.
            </Paragraph>
            <Paragraph>
              <ol>
              </ol>
            </Paragraph>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect(CommonUtils.mapStatesToProps)(App);
