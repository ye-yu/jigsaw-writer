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
import CommonUtils, { DefaultProps, DrawerUtils } from './shared/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Divider, Row, Form, Input, List } from 'antd';
import Title from 'antd/lib/typography/Title';
import setText from './features/workflow/action';

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
  const [form] = Form.useForm<{text:string}>();

  useEffect(() => {
    form.setFieldsValue({
      text: props.workflows.text
    })
  }, [form, props.workflows.text])

  return <Form layout="vertical" form={form} onValuesChange={(_, v) => props.dispatch(setText(v.text))}>
    <Form.Item label="Your text:" name="text">
      <Input placeholder="input placeholder" />
    </Form.Item>
  </Form>
}

function Canvas(props: DefaultProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref || !ref.current) return;
    const context = ref.current.getContext("2d")
    if (!context) return;
    context.clearRect(0, 0, 600, 600)
    context.strokeStyle = "#111120"
    const words = CommonUtils.syllableSplitter(props.workflows.text)

    const cols = words.length
    for(let col = 0; col < cols; col++) {
      const syllables = words[col]
      DrawerUtils.horizontalBase(context, col + 1, cols, 0, 600)
      for(let row = 0; row < syllables.length; row++) {
        const syllable = syllables[row]
        const consonant = syllable.slice(0, 1)
        const verticalDrawer = DrawerUtils.DRAWER[consonant]
        if (!verticalDrawer) {
          context.strokeStyle = "maroon"
          DrawerUtils.verticalBase(context, col, cols, row, 600)
          context.strokeStyle = "#111120"
        } else {
          verticalDrawer(context, col, cols, row, 600)
        }

        const vowel = syllable.slice(1)
        const horizontalDrawer = DrawerUtils.DRAWER[vowel]
        if (!horizontalDrawer) {
          DrawerUtils.horizontalBase(context, col + 1, cols, row + 1, 600)
        } else {
          horizontalDrawer(context, col, cols, row, 600)
        }
      }
      const previousLength = words[col - 1] && words[col - 1].length
      const currentLength = words[col].length
      if (words[col - 1] && (previousLength - currentLength) > 0) {
        const diff = previousLength - currentLength
        for(let row = currentLength; row < currentLength + diff; row++) {
          DrawerUtils.verticalBase(context, col, cols, row, 600)
        }
      }
    }

    const lastRow = words[words.length - 1]
    for(let row = 0; row < lastRow.length; row++) {
      DrawerUtils.verticalBase(context, cols, cols, row, 600)
    }
  }, [props.workflows.text])
  return <canvas style={{width:"100%", height:"100%"}} ref={ref} width="600" height="600" />
}

class App extends React.Component<DefaultProps> {
  canvasRef?: React.Ref<HTMLCanvasElement>;

  render() {
    
    const words = CommonUtils.syllableSplitter(this.props.workflows.text)
    return (
      <div className="App">
        <Layout style={{ height: "100%" }}>
          <Header><div className="big centered"><FontAwesomeIcon icon="puzzle-piece" width={20} />
            <span className="brand">
              <span className="red">J</span>
              <span className="orange">i</span>
              <span className="yellow">g</span>
              <span className="green">s</span>
              <span className="blue">a</span>
              <span className="purple">w</span>
            </span>
          Writer | <span className="thin">Write in Jigsaw Script</span></div></Header>
          <Content className={"content"}>
            <Row>
              <Col span={12}>
                <Title level={4}>Fill in your words!</Title>
                <Divider />
                <FormDetails {...this.props} />
                <Divider />
                <Title level={4}>Your syllables:</Title>
                <List bordered dataSource={words} renderItem={item => <List.Item className="beans">
                  {item.map((e, i) => <span className={e.endsWith("!") && !e.endsWith("e!") ? "error" : ""} key={i}>{e}</span>)}
                </List.Item>} />
              </Col>
              <Col span={12}>
                <Canvas {...this.props} />
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default connect(CommonUtils.mapStatesToProps)(App);
