/**
 * @FileDesc: 数据库分析概览
 * @Author:
 * @Func: 能够进行数据分析概览
 * @Components:
 */
<template>
  <BasicLayout>
    <template #wrapper>
      <div class="box-card">
        <div class="report-title">
          <h2 class="title">
            分析管理
          </h2>
        </div>
        <div class="report-index">
          <div class="report-index">
            <h4 class="item">
              <span style="font-size:16px;">分析导航</span>
            </h4>
            <div class="item">
              <p>
                分析导航提供微生物多样性数据分析整体导览图，可通过导览图定制分析流程；分析指南通过真实的文献分析案例引导您快速开启微生物多样性数据分析之旅。
              </p>
            </div>
          </div>
          <div class="report-index">
            <h4 class="item">
              <span style="font-size:16px;">分析软件信息</span>
            </h4>
            <div class="item">
              <p>
                展示该项目下各分析所用分析软件及其版本号等信息。
              </p>
            </div>
          </div>
        </div>
      </div></template>
  </basiclayout>
</template>
<style scoped>
.report-title{background:#F5F5F5;margin-bottom: 20px;}
.report-index{border:1px solid #e2e2e2;padding:15px 25px;background: #fff;margin-bottom: 20px;}
</style>