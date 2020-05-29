import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import config from './config.json'
import _ from 'underscore'
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import listReactFiles from 'list-react-files'
import $ from 'jquery'


let effects = ['Zoom', 'FlipXDown', 'FlipXUp', 'FlipYLeft', 'FlipYRight']
class App extends Component {

  constructor() {
    super();
    this.state = {
      name: 'React',
      startPage: true,
      quiz: this.createCountObj(),
      showDialog: false,
      activeId: null,
    };
    this.animationSettings = { effect: _.sample(effects), duration: 1000 };
    this.dlgButton = [{
      click: () => { this.dialogClose() },
      buttonModel: { content: 'Done', isPrimary: true }
    }];
    this.seconds = 0
    this.minutes = 0
  }

  componentDidMount = () => {
    var that = this
    setInterval(function () {
      if (that.seconds == 59) {
        that.seconds = 0
      }
      else {
        that.seconds = that.seconds + 1
      }
      $('#secs').html(that.seconds)
    }, 1000);

    setInterval(function () {
      if (that.minutes == 59) {
        that.minutes = 0
      }
      else {
        that.minutes = that.minutes + 1
      }
      $('#mins').html(that.minutes)
    }, 60000);

  }
  createCountObj = () => {
    let count = config.count
    let result = []
    _.range(1, count + 1).map((val, index) => {
      result.push({
        id: val,
        active: true,
      })
    })
    return result
  }

  dialogClose() {
    let quiz = this.state.quiz
    quiz = quiz.map((arg, index) => {
      if (arg.id === this.state.activeId) {
        arg.active = false
      }
      return arg
    })
    this.setState({ showDialog: false, quiz });
    this.animationSettings.effect = _.sample(effects)

  }
  renderButtons = () => {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.quiz.map((val, index) => {
          return <button key={_.random(99999) + ''} className='e-control e-btn e-outline e-primary buttonStyle' onClick={() => { this.handleButtonClick({ id: val.id }) }} id={val.id} disabled={!val.active}>{val.id}</button>
        })}
      </div>
    )
  }

  handleButtonClick = (arg) => {
    let { id } = arg
    console.log('open modal window');
    this.setState({
      activeId: id,
      showDialog: true
    })
  }

  render() {
    let remainingCount = _.filter(this.state.quiz, (arg) => { return !arg.active }).length
    window.state = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='title'>
            {config.title}
            <div className={'remainingCount'}> {remainingCount} of {config.count} </div>
            <div className={'time'}><span id='mins'>00</span> : <span id='secs'>0</span></div>
          </div>
        </div>
        {this.renderButtons()}
        {this.state.showDialog && this.renderModal()}
      </div>
    );
  }

  renderModal = () => {
    console.log('in render modal exectoino', this.state.showDialog);
    return <DialogComponent
      id='AnimationDialog'
      isModal={true}
      header={'Question ' + this.state.activeId}
      showCloseIcon={true}
      animationSettings={this.animationSettings}
      width='800px'
      height='600px'
      ref={defaultDialog => this.defaultDialogInstance = defaultDialog}
      target='#target'
      buttons={this.dlgButton}
      visible={this.state.showDialog}
      beforeClose={() => this.dialogClose()}
    >
      {/* <span><img src='./images/1.png' width={500} height={450} className='imageStyle' /></span> */}
      <img src={`./images/${this.state.activeId}.png`} width={500} height={450} className='imageStyle' />
    </DialogComponent>
  }
}

render(<App />, document.getElementById('root'));
