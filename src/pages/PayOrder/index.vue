<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
        </h4>
        <div class="paymark">
          <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>145687</em></span>
          <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{totalAmount}}</em></span>
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>尚品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
          <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
        </ol>
        <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
        <ul>
          <li>支付帐号：11111111</li>
          <li>密码：111111</li>
          <li>支付密码：111111</li>
        </ul>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg"></li>
            <li><img src="./images/pay3.jpg"></li>
          </ul>

        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg"></li>
              <li><img src="./images/pay11.jpg"></li>
              <li><img src="./images/pay12.jpg"></li>
              <li><img src="./images/pay13.jpg"></li>
              <li><img src="./images/pay14.jpg"></li>
              <li><img src="./images/pay15.jpg"></li>
              <li><img src="./images/pay16.jpg"></li>
              <li><img src="./images/pay17.jpg"></li>
              <li><img src="./images/pay18.jpg"></li>
              <li><img src="./images/pay19.jpg"></li>
              <li><img src="./images/pay20.jpg"></li>
              <li><img src="./images/pay21.jpg"></li>
              <li><img src="./images/pay22.jpg"></li>
            </ul>
          </div>

        </div>
        <div class="hr"></div>

        <div class="submit">
          <a href="javascript:" class="btn" @click="pay">立即支付</a>
        </div>
        <div class="otherpay">
          <div class="step-tit">
            <h5>其他支付方式</h5>
          </div>
          <div class="step-cont">
            <span>微信支付</span>
            <span>中国银联</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import QRCode from 'qrcode'
export default {
    name:'PayOrder',
    data(){
        return {
            orderId:this.$route.query.orderId

        }
    },
    mounted () {
      this.$store.dispatch('order/getPayInfo', this.orderId)
    },
    computed: {
      ...mapGetters('order',['totalAmount']),
      ...mapState('order',{
        payInfo: state => state.payInfo
      }),
    },

    methods: {
      /* 
      生成支付二维码界面
      */
      async pay () {
        // 根据支付url生成二维码图片url
        const url = await QRCode.toDataURL(this.payInfo.codeUrl)
        // 显示二维码图片提示 用的是elementui的messageBox
        this.$confirm(`<img src="${url}"/>`,'使用微信扫码支付',{
            dangerouslyUseHTMLString:true,
            type:'info',
            confirmButtonText: "我已完成支付",
            cancelButtonText:"支付遇到问题",
            center:true,
            showClose:false,
        }).then(
            // 点了已支付 跳转到成功界面
            this.$router.push('/paySuccess')
        ).catch(()=>{
                this.$alert('稍后再试'),
                clearInterval(this.timer),
                this.timer=null
            }
        )
        // 轮询 每隔固定时间向后端发请求 
        if(!this.timer){
            this.timer = setInterval(async ()=>{
                try{
                    // 成功后 清除定时器
                    const result = await this.$API.reqOrderStatus(this.orderId)
                    if(result.code === 200){
                        this.$router.push('/paySuccess')
                        // 这个clear也可以放在beforDestroy
                        clearInterval(this.timer)
                        this.timer=null
                    }
                }catch(e){
                    this.$alert('支付出错，请稍后再试')
                    clearInterval(this.timer)
                    this.timer=null
                }
            },3000)
        }
      }
    },
    beforeDestroy(){
        if(this.timer) clearInterval(this.timer)
    }


}
</script>

<style lang="less" scoped>
  .pay-main {
      margin-bottom: 20px;
      .pay-container {
          margin: 0 auto;
          width: 1200px;
          a:hover {
              color:#4cb9fc;
          }
          .orange {
              color: #e1251b;
          }
          .money {
              font-size: 18px;
          }
          .zfb {
              color: #e1251b;
              font-weight: 700;
          }
          .checkout-tit {
              padding: 10px;
              .tit-txt {
                  font-size: 14px;
                  line-height: 21px;
                  .success-icon {
                      width: 30px;
                      height: 30px;
                      display: inline-block;
                      background: url(./images/icon.png) no-repeat 0 0;
                  }
                  .success-info {
                      padding: 0 8px;
                      line-height: 30px;
                      vertical-align: top;
                  }
              }
              .paymark {
                  overflow: hidden;
                  line-height: 26px;
                  text-indent: 38px;
                  .fl {
                      float: left;
                  }
                  .fr {
                      float: right;
                      .lead {
                          margin-bottom: 18px;
                          font-size: 15px;
                          font-weight: 400;
                          line-height: 22.5px;
                      }
                  }
              }
          }
          .checkout-info {
              padding-left: 25px;
              padding-bottom: 15px;
              margin-bottom: 10px;
              border: 2px solid #e1251b;
              h4 {
                  margin: 9px 0;
                  font-size: 14px;
                  line-height: 21px;
                  color: #e1251b;
              }
              ol {
                    padding-left: 25px;
                    list-style-type: decimal;
                    line-height: 24px;
                    font-size: 14px;
                }
              ul {
                  padding-left: 25px;
                  list-style-type: disc;
                  line-height: 24px;
                  font-size: 14px;
              }
          }
          .checkout-steps {
              border: 1px solid #ddd;
              padding: 25px;
              .hr {
                  height: 1px;
                  background-color: #ddd;
              }
              .step-tit {
                  line-height: 36px;
                  margin: 15px 0;
              }
              .step-cont {
                  margin: 0 10px 12px 20px;
                  ul {
                      font-size: 0;
                      li {
                          margin: 2px;
                          display: inline-block;
                          padding: 5px 20px;
                          border: 1px solid #ddd;
                          cursor: pointer;
                          line-height: 18px;
                      }
                  }
              }
          }
          .submit {
              text-align: center;
              .btn {
                  display: inline-block;
                  padding: 15px 45px;
                  margin: 15px 0 10px;
                  font: 18px "微软雅黑";
                  font-weight: 700;
                  border-radius: 0;
                  background-color: #e1251b;
                  border: 1px solid #e1251b;
                  color: #fff;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  user-select: none;
                  text-decoration: none;
              }
          }
      }
  }
</style>