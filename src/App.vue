<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
body ,ul,html{
   margin:0;
   padding:0;
}
a{
    text-decoration: none;
    color: #666666;
    
}
p{
    margin: 0;
}
li{
    list-style: none;
}
input,textarea,button,select{
    outline: none;
}

body,html{
  background:#e6eff7;
}
.container{
    width: 1200px;
    margin: 0 auto;
}
#header{
  overflow:hidden;
  width:100%;
  height:67px;
  background:#3a8dcc;
  .logo{
    width:410px;
    height:37px;
    margin:10px;
    float:left;

    img{
      width:100%;
      height:100%;
    }
  }
  .notice{
    color:#fff;
    font-size:12px;
    width:110px;
    height:15px;
    line-height:15px;
    margin:20px 40px;
    float:left;
    img{
      width:15px;
      height:15px;
      margin-right:3px;
    }
  }
  .logins{
    float:right;
    width:230px;
    height:100%;
    position:relative;
    span{
      font-size:12px;
      color:#fff;
    }
    button{
      width:80px;
      height:26px;
      background:#2b6999;
      border-radius:5px;
      border:none;
      color:#fff;
      margin-top:7px;
      margin-bottom:7px;
      cursor:pointer;
    }
    div{

      width:100%;
      font-size:10px;
      color:#fff;
    }
  }
}

#content{
  width:100%;
  overflow:hidden;
  margin-top:10px;
  #content-left{
    width:150px;
    float: left;
        height: auto;
        min-height: 100%;
        background:#fff;
        ul{
          width:100%;
          overflow:hidden;
          li.big_li{
            padding:10px 0;
            border-bottom:1px solid #f2f2f2;
            
            &.on{
              
              div.li_link{
               
                background:url(../static/img/on.png) no-repeat;
                background-position:center left;
                a{
                   color:#3a8dcc;
                }
              }
            }
            div.li_link{
              font-weight:bold;
              width:100%;
              padding-left:20px;
              box-sizing:border-box;
              color:#333333;
              font-size:16px;
                cursor: pointer;
              line-height:42px;
              
            }
            ol{
              border-top:1px solid #f2f2f2;
              width:100%;
              padding:0;
              margin:0;
              padding:10px 0;
              li{
                cursor: pointer;
                color:#999999;
                font-size:14px;
                text-align:center;
                line-height:30px;
                width:100%;
                span{
                  display:inline-block;
                  float:right;
                  margin-right:20px;
                }
                &.on{
                  a{
                    color:#3a8dcc;
                  }
                  span{
                    color:#3a8dcc;
                  }
                }
              }
            }
          }
        }
  }
  #content-right{
    height: 100%;
        width: 1015px;
        overflow: hidden;
        padding-bottom: 9999px;
        margin-bottom: -9999px;
        float: left;
        margin-left:10px;
        .right-title{
          width:100%;
          height:40px;
          background:#fff;
          font-size:16px;
          color:#3a8dcc;
          font-weight:bold;
          line-height:40px;
          padding:0 20px;
          box-sizing:border-box;
          margin-bottom:20px;
          a{
            display:block;
            float:right;
            line-height:22px;
            color:#3a8dcc;
            border:1px #3a8dcc solid;
            border-radius:5px;
            margin-top:9px;
            font-weight:normal;
            font-size:12px;
            width:80px;
            height:22px;
            text-align:center;

          }
        }
        .edit-myself-info{
          width:100%;
          height:215px;
          background:#fff;
          overflow:hidden;
          padding-left:20px;
          box-sizing:border-box;
          margin-bottom:20px;
          h1{
            font-size:14px;
            color:#333333;
            height:30px;
            margin-top:20px;
            span{
              color:#3a8dcc;
            }
          }
          ul{
            width:100%;
            li{
              width:33.33%;
              float:left;
              line-height:30px;
              font-size:12px;
              color:#333333;
            }
          }
        }
  }
}
</style>
