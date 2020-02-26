import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Camera } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      src: ''
    }
  }

  componentWillMount () { }

  componentDidMount () { 
    const that = this
    Taro.getSetting({
      success(res) {
        console.log("res", res)
        if (!res.authSetting['scope.userInfo']) {
          that.setState({
            showBtn: true
          })
        }
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '首页'
  }

  onGetUser(data) {
    console.log(data)
  }

  takePhoto() {
    const ctx = Taro.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setState({
          src: res.tempImagePath
        })
      }
    })
  }

  error(e) {
    console.log(e.detail)
  }

  render () {
    var btn = null;
    if(this.state.showBtn){
      btn = <Button openType='getUserInfo' onGetUserInfo={this.onGetUser.bind(this)} >获取用户信息授权</Button>
    }
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        {btn}
        <Camera device-position='back' flash='off' binderror='error' style='width: 100%; height: 300px;'></Camera>
        <Button bindtap={this.takePhoto}>拍照</Button>
        <view>预览</view>
        <image mode='widthFix' src={this.state.src}></image>
      </View>
    )
  }
}
