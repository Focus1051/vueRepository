<template>
    <div class="newpro"> 
        <el-row :gutter="20">
            <el-col :span="24">
                <div class="grid-content bg-purple project">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">项目基本信息</h6>
                        <i class="f_r" :class="elIcon" @click="information"></i>
                    </div>
                     <div class="m_foot" v-if="scoreOpen">
                        <div class="m_eject">
                            <h6 class="clearfloat">选择项目<i class="el-icon-error f_r" @click="close"></i></h6>
                            <div class="e_text">
                                <ul class="nuws2">
                                    <li class="m_text">选择</li>
                                    <li class="m_text">序号</li>
                                    <li>项目名称</li>
                                    <li>招采类别</li>
                                </ul>
                                <div class="g-i">
                                    <i class="iconfont icon-zanwushuju"></i>
                                    <p>暂无数据</p>
                                </div>
                                <ul class="nuws2 bor">
                                    <li class="m_text"><el-checkbox v-model="checked"></el-checkbox></li>
                                    <li class="m_text">序号</li>
                                    <li>项目名称招采类别招采类别招采类别招采类别招采类别招采类别</li>
                                    <li>招采类别</li>
                                </ul>
                                <div class="e_foot">
                                    <el-button type="primary" size="medium" @click="preservation">确认</el-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="{newDisplay:newDisplay}">
                        <div class="pro-form">
                            <span>项目名称</span>
                            <div class="pro-input">
                                <el-input placeholder="请输入内容" v-model="submitInfo.projectName">
                                <template slot="append"><div class="choice" @click="nameChoice">可选择</div></template>
                                </el-input>
                            </div>
                        </div>
                        <ul class="clearfloat pro-form">
                            <li class="f_l pro-li">
                                <span>项目编号</span>
                                <div class="pro-input">
                                    <el-input placeholder="请输入项目编号" v-model="submitInfo.projectNum"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>项目级别</span>
                                <div class="pro-input">
                                    <el-input placeholder="请输入项目级别" v-model="submitInfo.level"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>项目负责人</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.takeCharge" placeholder="请选择">
                                        <el-option v-for="item in optionsTC" :key="submitInfo.takeCharge" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span> 资金来源</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.moneySource" placeholder="请选择">
                                        <el-option v-for="item in optionsMS" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>招采类型</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.type" placeholder="请选择">
                                        <el-option v-for="item in optionPT" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>采购方式</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.purchaseWay" placeholder="请选择">
                                        <el-option v-for="item in optionPW" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>供应商产生</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.supplierProduce" placeholder="请选择">
                                        <el-option v-for="item in optionSP" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>中小微企业</span>
                                <div class="pro-input">
                                    <el-select v-model="submitInfo.littleCompany" placeholder="请选择">
                                        <el-option v-for="item in optionLC" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>采购对象</span>
                                <div class="pro-input">
                                    <el-input v-model="submitInfo.object" placeholder="请输入采购对象"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>投标文件正本份数</span>
                                <div class="pro-input produo">
                                    <el-input v-model="submitInfo.filePositive" placeholder="请输入内容"></el-input>
                                </div>
                                <span>投标文件副本份数</span>
                                <div class="pro-input produo">
                                    <el-input v-model="submitInfo.fileAssistant" placeholder="请输入内容"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li protime">
                                <span>封面时间</span>
                                <div class="pro-input">
                                    <el-date-picker
                                    v-model="submitInfo.coverTime"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>联合体</span>
                                <div class="pro-input">
                                     <el-input v-model="submitInfo.combo" placeholder="请输入内容"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>分包数量</span>
                                <div class="pro-input">
                                     <el-input v-model="submitInfo.subpackageNum" placeholder="请输入内容"></el-input>
                                </div>
                            </li>
                        </ul>
                        <div class="porBtn" @click="nextbtn"><el-button type="info" round>下一步</el-button></div>
                    </div>
                   
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="20" v-if="contact">
            <el-col :span="24">
                <div class="grid-content bg-purple project">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">招标采购联系</h6>
                        <i class="f_r" :class="elIcon2" @click="information2"></i>
                    </div>

                    <div :class="{newDisplay:newDisplay2}">
                        <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>采购人</span>
                                <div class="pro-input">
                                 <el-input v-model="submitInfo.takeCharge" placeholder="请输入内容"></el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>地址</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.purchaserAddress"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span> 联系人</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.purchaserContact"
                                   >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>联系电话</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.purchaserPhone"
                                     >
                                    </el-input>
                                </div>
                            </li>
                        </ul>
                        <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>采购代理机构</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.agencyId"
                                     >
                                    </el-input>
                                </div>
                            </li>
                            <!-- <li class="f_l pro-li">
                                <span>地址</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li> -->
                            <li class="f_l pro-li">
                            <span> 邮政编码</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.zipCode"
                                       >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>传真</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.fax"
                                     >
                                    </el-input>
                                </div>
                            </li>
                             <li class="f_l pro-li">
                            <span>采购代理机构联系人</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.agentContact"
                                       >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>采购代理机构联系电话</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.agentPhone"
                                        >
                                    </el-input>
                                </div>
                            </li>
                        </ul>
                        <!-- <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>投诉受理单位</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>地址</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                      >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span> 联系电话</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                     >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>邮政编码</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                      >
                                    </el-input>
                                </div>
                            </li>
                        </ul> -->
                        
                        <!-- <div class="pro-form">
                            <span>项目名称</span>
                            <div class="pro-input">
                                <el-input placeholder="请输入内容" v-model="input2">
                                </el-input>
                            </div>
                        </div> -->
                        <div class="porBtn" @click="nextbtn2"><el-button type="info" round>下一步</el-button></div>
                    </div>
                   
                </div>
            </el-col>
        </el-row>

         <el-row :gutter="20" v-if="contact3">
            <el-col :span="24">
                <div class="grid-content bg-purple project">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">项目分包信息</h6>
                        <i class="f_r" :class="elIcon3" @click="information3"></i>
                    </div>
                    <div :class="{newDisplay:newDisplay3}">
                        <div class="pro-form">
                            <span>投标保证金</span>
                            <div class="pro-input">
                                <el-input placeholder="请输入内容" v-model="submitInfo.margin">
                                </el-input>
                            </div>
                            <!-- <div class="collect">
                                <span>收取方式</span>
                                <el-radio v-model="radio" label="1">转帐汇款</el-radio>
                                <el-radio v-model="radio" label="2">支票</el-radio>
                                <el-radio v-model="radio" label="3">汇票</el-radio>
                                <el-radio v-model="radio" label="4">本票</el-radio>
                                <el-radio v-model="radio" label="5">保函</el-radio>
                            </div> -->
                        </div>
                        
                        <ul class="clearfloat subcontract">
                            <li class="f_l">
                                <span>分包号</span>
                                <div>
                                    第一包
                                </div>
                            </li>
                            <li class="f_l">
                            </li>
                            <li class="f_l">
                                <span>包名称</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                             <li class="f_l">
                                <span>合同编号</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                             <li class="f_l">
                                <span>采购预算(元)</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>最高限价(元)</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>履约期限</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.performancePeriod"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>履约地点</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.performanceAddress"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>核心产品</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.coreProduct"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>分包备注</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l payment clearfloat">
                                <span class="f_l">付款方式</span>
                                <div class="f_r">
                                    <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="input">
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l payment">
                                <span>投标保证金金额(元)</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l">
                                <span>进口产品</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.importedProducts"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <!-- <li class="f_l">
                                <span>中标/成交家数</span>
                                <div>
                                    <el-input
                                        placeholder="请输入内容"
                                        type="number"
                                        min="0"
                                        v-model="input">
                                    </el-input>
                                </div>
                            </li> -->
                        </ul>
                        <!-- <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>收款单位</span>
                                <div class="pro-input">
                                    <el-input placeholder="请输入内容" v-model="input2">
                                </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>开户银行</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span> 缴纳截至日期</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                   >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>银行账号</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input">
                                    </el-input>
                                </div>
                            </li>
                        </ul> -->
                        <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>履约保证金</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.performanceMargin">
                                    </el-input>
                                </div>
                                
                            </li>
                            <li class="f_l pro-li">
                                <div class="collect">
                                    <span>收取方式</span>
                                    <div class="pro-input">
                                         <el-radio v-model="radio" label="1">转帐汇款</el-radio>
                                        <el-radio v-model="radio" label="2">支票</el-radio>
                                        <el-radio v-model="radio" label="3">汇票</el-radio>
                                        <el-radio v-model="radio" label="4">本票</el-radio>
                                        <el-radio v-model="radio" label="5">保函</el-radio>
                                    </div>
                                   
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>收取比列</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                        >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span>收款单位</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                   >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>开户银行</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.marginBank"
                                     >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>银行账号</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.bankNum"
                                     >
                                    </el-input>
                                </div>
                            </li>
                        </ul>
                        <!-- <div class="pro-form">
                            <div class="pro-input">
                               金额:本项目采购合同金额的0%;</br>
                               交款方式:</br>
                               收款单位:</br>
                               开户银行:</br>
                               银行账号:</br>
                               交款时间:中标通知书发放后,政府采购合同签订前.
                            </div>
                        </div> -->
                        <div class="porBtn" @click="nextbtn3"><el-button type="info" round>下一步</el-button></div>
                    </div>
                   
                </div>
            </el-col>
        </el-row>

         <el-row :gutter="20" v-if="contact4">
            <el-col :span="24">
                <div class="grid-content bg-purple project">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">报名开标评标</h6>
                        <i class="f_r" :class="elIcon4" @click="information4"></i>
                    </div>

                    <div :class="{newDisplay:newDisplay4}">
                        <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>开始时间</span>
                                <div class="pro-input">
                                    <el-date-picker
                                    v-model="time"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>结束时间</span>
                                <div class="pro-input">
                                    <el-date-picker
                                    v-model="time"
                                    type="date"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span>文件发售方式</span>
                                <div class="pro-input">
                                    <el-select v-model="value" placeholder="请选择">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>招标文件售价</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                     >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>获取地点</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                     >
                                    </el-input>
                                </div>
                            </li>
                        </ul>
                        <ul class="clearfloat pro-form proContact">
                            <li class="f_l pro-li">
                                <span>投标截止时间</span>
                                <div class="pro-input">
                                    <el-date-picker
                                    v-model="submitInfo.endTime"
                                    type="date"
                                     value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>开标时间</span>
                                <div class="pro-input">
                                    <el-date-picker
                                    v-model="submitInfo.reserved01"
                                    type="date"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                            <span>投标地点</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.bidAddress"
                                       >
                                    </el-input>
                                </div>
                            </li>
                            <li class="f_l pro-li">
                                <span>开标地点</span>
                                <div class="pro-input">
                                    <el-input
                                        placeholder="请输入内容"
                                        v-model="submitInfo.startAddress"
                                     >
                                    </el-input>
                                </div>
                            </li>
                        </ul>
                        <div class="porBtn" @click="nextbtn4"><el-button type="info" round>下一步</el-button></div>
                    </div>
                </div>
            </el-col>
        </el-row>
         <el-row :gutter="20" v-if="contact4">
            <el-col :span="24">
                <div class="grid-content bg-purple project">
                    <div class="clearfloat c_top">
                        <h6 class="f_l">资格技术评审</h6>
                        <i class="f_r" :class="elIcon4" @click="information4"></i>
                    </div>

                    <div :class="{newDisplay:newDisplay4}">
                        <p class="review-p clearfloat">资格条件
                            <i class="el-icon-edit-outline f_r"></i>
                        </p>
                        <ul class="condition">
                            <li class="pro-review">
                                资格条件(固定模板)
                            </li>
                        </ul>
                        <ul class="condition">
                            <li class="pro-condition">
                                资格条件(固定模板)1
                            </li>
                             <li class="pro-condition">
                                资格条件(固定模板)2
                            </li>
                            <li class="pro-condition">
                                7.采购人根据采购项目提出的特殊条件： （1）供应商必须具备古建筑工程专业承包叁级及以上资质，具有建设行政主管部门核发的有效安全生产
                                许可证，并在人员、设备、资金等方面具有相应的施工能力； （2）拟派的项目经理必须具有建筑工程专业贰级及以上注册建造师证，具有有效的安全
                                生产考核合格证书（B证）且未担任其他在施建设工程项目的项目经理的声明； （3）供应商须提供有关资质证明文件和业绩情况，即提供一个及以上的类
                                似业绩证明材料（提供在全国公共市场建筑监管服务公共平台上网页查询截图并加盖公章）； （4）参加政府采购活动前三年内，在经营活动中没有重大违法记
                                录声明。且在“信用中国”网站（www.creditchina.gov.cn）上查询无“失信惩戒”信息和在“中国政府采购网”（www.ccgp.gov.cn）上查询未被列入政府采购严
                                重违法失信行为记录名单（提供网页查询截图并加盖公章）； （5）投标人须提供在中国裁判文书网（http://wenshu.court.gov.cn/）查询刑事案件-“无行贿犯罪记
                                录”的证明材料（提供网页查询截图并加盖公章）； 
                                （6）投标人到达开标现场工作人员均需提供“投标人员（供应商）承诺书”原件。 （7）本项目不接受联合体参与谈判。
                            </li>
                        </ul>
                        <ul class="condition">
                            <li class="pro-review">
                               资格条件（项目新增）
                            </li>
                        </ul>
                        <ul class="condition">
                            <li class="pro-condition">
                                资格条件(固定模板)1
                            </li>
                             <li class="pro-condition">
                                资格条件(固定模板)2
                            </li>
                        </ul>
                        <!-- <div class="pro-modify">
                            <div class="pro-modify2">
                                <h6 class="clearfloat">选择项目 <i class="el-icon-circle-close f_r"></i></h6>
                                <ul class="condition">
                                    <li class="pro-review">
                                        资格条件(固定模板)
                                    </li>
                                </ul>
                                <ul class="condition">
                                    <li class="pro-condition">
                                        <input type="text">
                                    </li>
                                </ul>
                                <ul class="condition">
                                    <li class="pro-review ">
                                        资格证明材料(模板)
                                    </li>
                                </ul>
                                <ul class="condition">
                                    <li class="clearfloat pro-condition">
                                        <input type="text" class="f_l">
                                         <i class="el-icon-delete f_r"></i>
                                    </li>
                                </ul>
                                <div>
                                    <el-button type="primary">增加</el-button>
                                    <el-button type="success">删除</el-button>
                                </div>
                            </div>
                           
                            
                        </div> -->
                         <p class="review-p">技术商务</p>
                        <div class="condition">
                            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption" style="height:400px;"></quill-editor>
                            
                        </div>
                        <div class="condition" style="margin-top:60px">
                            <!-- <p style="color:red">注：如“资格条件”有新增，请同时对“资格证明材料”进行编辑操作，否则会造成招标采购文件前后无法对应。</p>
                            <div class="pro-standard">
                                <span>评标方法</span>
                                <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                     >
                                    </el-input>
                            </div>
                            
                            <div class="pro-standard">
                                <span>定标原则</span>
                                <el-input
                                        placeholder="请输入内容"
                                        v-model="input"
                                     >
                                    </el-input>
                            </div> -->

                        </div>
                        <div class="choose-one">
                           
                            <el-radio v-model="submitInfo.status" label="1">暂时保存</el-radio>
                            <el-radio v-model="submitInfo.status" label="2">最终数据</el-radio>
                        </div>
                        <div class="porBtn" @click="submitInfo2"><el-button type="info" round>提交</el-button></div>
                        <div class="porBtn" @click="exportWord"><el-button type="info" round>导出数据</el-button></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>



<script>
import Docxtemplater from 'docxtemplater';
import JSZip from 'pizzip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';


export default {
    data(){
        return{
            entry:{
                name:"",
                person:"",
            },
            input:"",
            input2:"",
            optionsTC: [{
                value: '选项1',
                label: '张三'
                }, {
                value: '选项2',
                label: '李四'
                }, {
                value: '选项3',
                label: '老王'
                }, {
                value: '选项4',
                label: '龙面'
                }, {
                value: '选项5',
                label: '北京'
            }],

            optionsMS: [{
                value: '选项1',
                label: '微信微信微信'
                }, {
                value: '选项2',
                label: '支付宝支付宝支付宝'
                }, {
                value: '选项3',
                label: '现金现金现金'
                }],

                optionSP: [{
                value: '选项1',
                label: '供应商产生1'
                }, {
                value: '选项2',
                label: '供应商产生2'
                }, {
                value: '选项3',
                label: '供应商产生3'
                }],  

                
                optionLC: [{
                value: '选项1',
                label: '中小微1'
                }, {
                value: '选项2',
                label: '中小微2'
                }, {
                value: '选项3',
                label: '中小微3'
                }],


                
                optionPW: [{
                value: '选项1',
                label: '采购方式1'
                }, {
                value: '选项2',
                label: '采购方式2'
                }, {
                value: '选项3',
                label: '采购方式3'
                }],  


            optionPT: [{
                value: '选项1',
                label: '招采类型1'
                }, {
                value: '选项2',
                label: '招采类型2'
                }, {
                value: '选项3',
                label: '招采类型3'
                }],    
                
           submitInfo:{
            
            },

            input3: '',
            select: '',
            value1: '',
            scoreOpen:false,//弹窗显示
            checked:false,//单选框选中
            newDisplay:false,//项目基本信息显示隐藏
            newDisplay2:false,//项目基本信息显示隐藏
            newDisplay3:false,
            newDisplay4:false,
            elIcon:"el-icon-arrow-down",//展示收起图标
            elIcon2:"el-icon-arrow-down",//展示收起图标
            elIcon3:"el-icon-arrow-down",
            elIcon4:"el-icon-arrow-down",
            contact:false,//招标采购联系 显示
            contact3:false,
            contact4:false,
            radio:"",//保证金收取方式
            time:"",
            txt: '',
　　　　　　 content: '',
            editorOption: {
               placeholder: '编辑文章内容'
             },
        }
    },

    mounted() {
　　　　//　　阻止光标默认选中
// 　　　　this.$refs.richAnalysis.quill.enable(false);

　　　　setTimeout(() => {
    console.log(this.$refs.richAnalysis)
// 　　　　　　this.$refs.richAnalysis.quill.enable(true);
// 　　　　　　this.$refs.richAnalysis.quill.blur();
　　　　}, 1000)
　　},


   created(){

        this.$axios.post('/Bid/project/getDraf',null,{
            params:{
                userId:localStorage.getItem("id"),
            }
            }).then(res=>{
                console.log("created回来数据:"+res.data);
                console.log("created回来数据2:"+res.data.projectName);
                if(res.data.projectName!=null){
                    console.log("数据不为空");
                    this.submitInfo=res.data;
                }
                
        })
   },

    

    methods:{


// 点击导出word
    // exportWord:function() {
    //     console.log("文件:");
    //   const that = this
    //   // 读取并获得模板文件的二进制内容
    //   JSZipUtils.getBinaryContent("../../../../input.docx", function(error, content) {
    //   // gy-agree-service.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
    //   // 抛出异常
    //     if (error) {
    //       throw error
    //     }
    //     console.log(content)
    //     // 创建一个PizZip实例，内容为模板的内容
    //     const zip = new JSZip(content)
    //     // 创建并加载docxtemplater实例对象
    //     const doc = new Docxtemplater().loadZip(zip)
    //     // 设置模板变量的值
    //     doc.setData({
    //     //   projectName:that.submitInfo.projectName,
    //     //   projectNum:that.submitInfo.projectNum,
    //       projectName:"难道就",
    //       projectNum:"地方v比方说",
    //     })
    //     try {
    //     // 用模板变量的值替换所有模板变量
    //       doc.render()
    //     } catch (error) {
    //     // 抛出异常
    //       const e = {
    //         message: error.message,
    //         name: error.name,
    //         stack: error.stack,
    //         properties: error.properties
    //       }
    //       console.log(JSON.stringify({ error: e }))
    //       throw error
    //     }
 
    //     // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
    //     const out = doc.getZip().generate({
    //       type: 'blob',
    //       mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    //     })
    //     // 将目标文件对象保存为目标类型的文件，并命名
    //     saveAs(out, 'gg.docx')
    //   })
    // },


    // 点击导出word
exportWord:function(){
    {
        let _this = this;
        // 读取并获得模板文件的二进制内容
        JSZipUtils.getBinaryContent("../../../static/input.docx", function(error, content) {
            // input.docx是模板。我们在导出的时候，会根据此模板来导出对应的数据
            // 抛出异常
            if (error) {
                throw error;
            }

            // 创建一个JSZip实例，内容为模板的内容
            let zip = new JSZip(content);
            // 创建并加载docxtemplater实例对象
            let doc = new Docxtemplater().loadZip(zip);
            // 设置模板变量的值
            doc.setData({
                projectName:"难道就",
                projectNum:"地方v比方说",
            });

            try {
                // 用模板变量的值替换所有模板变量
                doc.render();
            } catch (error) {
                // 抛出异常
                let e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties
                };
                console.log(JSON.stringify({ error: e }));
                throw error;
            }


            // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
            let out = doc.getZip().generate({
                type: "blob",
                mimeType:
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            // 将目标文件对象保存为目标类型的文件，并命名
            saveAs(out, "MYWORDS.docx");
        });
    }

},

  

        nextbtn(){//第一步下一步
            this.newDisplay=true;
            this.contact=true;
        },
        nextbtn2(){//第一步下一步
            this.newDisplay2=true;
            this.contact3=true;
        },
        nextbtn3(){//第一步下一步
            this.newDisplay3=true;
            this.contact4=true;
        },
        nextbtn4(){//第一步下一步
            this.newDisplay4=true;
        },
        nameChoice(){//项目名称可选择
            this.scoreOpen=true;
        },
        close(){//备注任务关闭
            this.scoreOpen=false;
        },
        preservation(){//备忘录提交

        },
        information(){//项目基本信息展开
            if(this.newDisplay==false){
                this.newDisplay=true;
                this.elIcon="el-icon-arrow-down";
            }else{
                this.newDisplay=false;
                this.elIcon="el-icon-arrow-up";
                
            }
        },
        information2(){//项目基本信息展开
            if(this.newDisplay2==false){
                this.newDisplay2=true;
                this.elIcon2="el-icon-arrow-down";
            }else{
                this.newDisplay2=false;
                this.elIcon2="el-icon-arrow-up";
                
            }
        },
        information3(){//项目基本信息展开
            if(this.newDisplay3==false){
                this.newDisplay3=true;
                this.elIcon3="el-icon-arrow-down";
            }else{
                this.newDisplay3=false;
                this.elIcon3="el-icon-arrow-up";
                
            }
        },
        information4(){//项目基本信息展开
            if(this.newDisplay4==false){
                this.newDisplay4=true;
                this.elIcon4="el-icon-arrow-down";
            }else{
                this.newDisplay4=false;
                this.elIcon4="el-icon-arrow-up";
                
            }
        },
        
        submitInfo2(){
            console.log("提交数据");

            if (!this.submitInfo.projectName) {
            alert('请输入项目名称!')
            return false
        }

            this.$axios.post("/Bid/project/makeBid",this.submitInfo,{
            params:{
                userId:localStorage.getItem("id"),
            }
            }).then(res=>{
                // if(this.submitInfo.status==2){
                //     this.$router.push("/government/project"); 
                // }
                this.$router.push("/government/project"); 
                console.log(res);
            });


   //  this.$axios.post("/Bid/project/makeBid",this.submitInfo,{
            // params:{
            //     userId:localStorage.getItem("id"),
            // }
            // }).then(res=>{
            //     console.log(res);
           
            // });
        },
    }
}
</script>
<style scoped>

.choose-one{
    text-align: center;
}
.newpro{
    position: relative;
}
.project{
    padding: 20px;
    margin-top:10px;
    background-color: #fff;
}
.c_top h6{
    font-size: 18px;
    padding-left:10px ;
    border-left: 3px solid #009f9d;
    color: #009f9d;
}
.c_top i{
    font-size: 14px;
}

.subcontract,.pro-form,.review-p,.condition{
    width: 80%;
    margin:auto;
}
.pro-form{
    margin:10px auto;
}
.review-p{
    margin:20px auto;
}
.pro-input{
    display: inline-block;
    margin-left: 10px;
    width:80%;
}
.pro-input .el-select{
    width:100%;
}
.produo .el-select{
    width:70%;
}
.pro-li{
    width:40%;
    margin-top: 20px;
}
.pro-li>span{
    display: inline-block;
    width:90px;
    font-size: 14px;
}
.pro-li>.pro-input{
    width:75%;
}
.protime{
    height:80px;
}
.porBtn{
    width:80px;
    margin: 50px auto;
}
.choice{
    cursor:pointer;
}

.m_eject{
    padding: 10px;
    width:800px;
    margin:300px auto;
    background-color: #fff;
}
.m_eject h6{
    text-align: left;
    color: #009f9d;
}
.e_ul{
    width:400px;
    margin:10px auto;
    text-align: left;
}
.e_ul input{
    width: 300px;
    height:30px;
}
.e_ul span{
    margin-right: 20px;
    color: rgb(146, 146, 146);
}
.e_ul li{
    margin-top:20px;
}
.score{
    display: inline-block;
}
.m_foot{
    position: fixed;
    z-index: 99;
    top:0px;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}

.nuws2{
    display: flex;
    justify-content: left;
    margin:20px;
}
.nuws2 li{
    font-weight: 600;
    width:30%;
    color: #009f9d;
    font-size: 14px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap
}
.nuws2 .m_text{
    width:20%;
}
.bor li{
    color: rgb(146, 146, 146);
}
.e_foot{
    margin-top:50px ;
    text-align: center;
}

.g-i{
    text-align: center;
    margin:30px auto;
    color: #ccc;
}
.g-i i{
    font-size: 130px;
}

.newDisplay{
    overflow: hidden;
    height: 0;
}

.proContact{
    padding:20px 0;
    border-bottom:1px solid #ccc ;
}
.subcontract li{
    height:40px;
    width: 48%;
    line-height: 40px;
    border: 1px solid #ccc;
}
.subcontract li span{
    display: inline-block;
    width:28%;
    text-align: right;
    padding: 0 10px;
    background-color:rgb(249,249,249) ;
}
.subcontract li>div{
    display: inline-block;
    width: 67%;
}

.collect{
    margin:20px 0;
}
.subcontract .payment,.subcontract .payment div{
    height:54px;
}
.subcontract .payment span{
    height:54px;
    top:0;
    line-height: 54px;
}

.pro-input .el-radio{
    margin-right: 12px;
}

.review-p{
    color:rgb(146, 146, 146);
}
.pro-review{
    height:40px;
    border:1px solid #ccc;
    background-color:rgb(249,249,249) ;
    line-height: 40px;
    color: rgb(146, 146, 146);
    padding-left:10px ;
}
.pro-condition{
    border:1px solid #ccc;
    color: rgb(146, 146, 146);
    padding:10px ;
}
.pro-condition input{
    width:90%;
    border: none;
    outline: none
}
.pro-modify{
    position: fixed;
    top:0px;
    width:100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.pro-modify2{
    width:50%;
    height:570px;
    margin:10%;
    background-color: #fff;
    border-radius: 5px;
    padding:30px;
    box-shadow: 0 0 10px 0 ;
}
.pro-modify2 h6{
    top: 0px;
    width:100%;
    height:30px;
    margin-bottom: 30px;
    color: rgb(146, 146, 146);
}
.pro-standard{
    display: inline-block;
    width: 40%;
}
</style>