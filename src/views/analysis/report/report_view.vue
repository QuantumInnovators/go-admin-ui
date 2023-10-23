<template>
  <BasicLayout>
    <template #wrapper>
      <div class="box-card">
        <div class="list-wrap" style="height: 1167px;">
          <div class="report-item">
            <a href="#1" class="">一 项目信息</a>
          </div>
          <div class="report-item">
            <a href="#2" class="">二 流程说明</a>
            <ul class="report-menu" style="display: none;">
              <li><a href="#4" class="">2.1 测序实验流程</a></li>
              <li><a href="#5">2.2 生物信息分析流程</a></li>
            </ul>
          </div>
          <div class="report-item">
            <a href="#3" class="current">三 分析报告</a>
            <ul class="report-menu" style="display: block;">
              <li><a href="#2434">3.1 分析管理</a></li>
              <ul class="report-menu" style="display: none;">
                <li><a href="#2437">3.1.1 分析软件信息</a></li>
              </ul>
              <li><a href="#6">3.2 数据信息管理</a></li>
              <ul class="report-menu" style="display: none;">
                <li><a href="#2438">3.2.1 样本信息管理</a></li>
                <li><a href="#11">3.2.2 测序信息统计</a></li>
              </ul>
              <li><a href="#7">3.3 物种注释与评估</a></li>
              <ul class="report-menu" style="display: none;">
                <li><a href="#26">3.3.1 OTU分析</a></li>
                <ul class="report-menu" style="display: none;">
                  <li><a href="#27">3.3.1.1 分类学分析</a></li>
                  <li><a href="#28">3.3.1.2 Pan/Core 物种分析</a></li>
                </ul>
                <li><a href="#20">3.3.2 Alpha多样性分析</a></li>
                <ul class="report-menu" style="display: none;">
                  <li><a href="#43">3.3.2.1 多样性指数</a></li>
                </ul>
                <li><a href="#21">3.3.3 稀释曲线分析</a></li>
              </ul>

              <li><a href="#10">3.4 物种组成分析</a></li>
              <ul class="report-menu" style="display: none;">
                <li><a href="#14">3.4.1 群落组成分析</a></li>
                <ul class="report-menu" style="display: none;">
                  <li><a href="#63">3.4.1.1 群落Bar图和Pie图</a></li>
                  <li><a href="#62">3.4.1.2 群落Heatmap图</a></li>
                </ul>
                <li><a href="#48">3.4.2 样本与物种关系</a></li>
              </ul>

            </ul>
          </div>
        </div>
      </div>
    </template>
  </basiclayout>
</template>

<style scoped>
.report-view {
  background: #fff;
  line-height: 2;
}
.report-item{border-bottom:1px solid #ddd;overflow:hidden;}
</style>