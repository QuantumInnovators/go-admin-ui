/**
 * @FileDesc: 工作流参数配置
 * @Author:
 * @Func: 整个分析工作流 参数配置
 * @Components:SpeciesClassif
 */
<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-tabs v-model="Tabs_activeName" @tab-click="handleClick">
          <el-tab-pane label="正常分析" name="first">
            <el-row :gutter="20">
              <el-col :span="8">
                所属项目:
                <el-select v-model="value" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="8">
                任务名称：
                <el-select v-model="value" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-button type="primary">保存</el-button>
                <el-button type="primary">保存并运行</el-button>
              </el-col>
              <el-col :span="8" />
            </el-row>
            <!-- <el-row>流程选择:
              <el-radio v-model="radio" label="1">常规流程</el-radio>
              <el-radio v-model="radio" label="2">基因流程</el-radio>
            </el-row> -->
            <el-collapse v-model="Collapse_activeNames" @change="handleChange">
              <el-collapse-item title="1.参数设置" name="1">
                <div>
                  <h3>说明：</h3>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      项目类型:
                      <el-select v-model="project_value" filterable placeholder="请选择">
                        <el-option
                          v-for="item in project_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      存储pdf：
                      <el-select v-model="store_value" filterable placeholder="请选择">
                        <el-option
                          v-for="item in store_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="8">
                      生成工作流分析报告*:
                      <el-select v-model="work_flow_value" filterable placeholder="请选择">
                        <el-option
                          v-for="item in work_flow_options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </el-col>
                    <el-col :span="8" />
                  </el-row>
                </div>

              </el-collapse-item>
              <el-collapse-item title="2.数据质控统计" name="2">
                <el-row>
                  <div class="layui-form-mid">
                    <strong>说明：</strong>
                    <span style="font-family:'Microsoft YaHei';font-size:14px;">
                      测序数据统计以及质量控制后数据量统计。输入fastq格式序列文件，可选择包含每个样本序列的fastq的文件夹或包含所有样本序列的单个fastq文件（序列名需标明样本ID），可选择性上传样本分组和环境因子表用于结果分析
                    </span>
                    <span style="font-family:'Microsoft YaHei';font-size:14px;">。</span>
                  </div>
                </el-row>
                <el-row>
                  <div style="margin: 20px;" />
                  <el-form :label-position="labelPosition" label-width="160px" :model="raw_seq_formLabelAlign">
                    <el-form-item label="原始序列信息统计表">
                      <el-input v-model="raw_seq_formLabelAlign.name" />
                    </el-form-item>
                    <el-form-item label="fastq序列文件*">
                      <el-input v-model="raw_seq_formLabelAlign.region" />
                    </el-form-item>
                    <el-form-item label="样本分组文件">
                      <el-input v-model="raw_seq_formLabelAlign.type" />
                    </el-form-item>
                  </el-form>
                </el-row>
              </el-collapse-item>
              <el-collapse-item title="3.物种分类" name="3">
                <el-row>
                  <div class="layui-form-mid"><strong>说明：</strong><span style="font-family:'Microsoft YaHei';font-size:14px;">为了得到每个OTU对应的物种分类信息，采用RDP classifier贝叶斯算法对97%相似水平的OTU代表序列进行分类学比对，系统已有数据库包括16S、18s、its、fungi等，也可以上传自定义数据库，需满足格式要求</span><span style="font-family:'Microsoft YaHei';font-size:14px;">。</span></div>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label class="layui-form-label " style="width:160px;">
                      物种分类数据库<span class="red">*</span>
                      <!-- // 图标提示框 -->
                      <el-tooltip class="item" effect="dark" content="设置分类比对使用的数据库，可使用系统已有数据库，自定义模式可以上传数据库文件。" placement="right">
                        <i class="el-icon-edit" />
                      </el-tooltip>
                    </label>
                    <el-select v-model="database_value" filterable placeholder="请选择">
                      <el-option
                        v-for="item in database_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <label class="layui-form-label " style="width:160px;">
                      物种注释方法<span class="red">*</span>
                      <!-- // 图标提示框 -->
                      <el-tooltip class="item" effect="dark" content="物种注释方法" placement="right">
                        <i class="el-icon-edit" />
                      </el-tooltip>
                    </label>
                    <el-select v-model="anno_method_value" filterable placeholder="请选择">
                      <el-option
                        v-for="item in anno_method_options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-col>

                </el-row>
              </el-collapse-item>
              <el-collapse-item title="4.OTU分析" name="4">
                <div class="layui-form-mid">
                  <strong>说明：</strong>
                  <span style="font-family:'Microsoft YaHei';font-size:14px;">
                    按最小样本序列数抽平
                  </span>
                  <span style="font-family:'Microsoft YaHei';font-size:14px;">。
                  </span>
                </div>
              </el-collapse-item>
              <el-collapse-item title="5.Alpha多样性分析" name="5">
                <el-row>
                  <div class="layui-form-mid">
                    <strong>说明：</strong>
                    <span style="font-family:'Microsoft YaHei';font-size:14px;">
                      群落生态学中研究微生物多样性，通过单样本的多样性分析（Alpha多样性）可以反映微生物群落的丰度和多样性，包括一系列统计学分析指数估计环境群落的物种丰度和多样性，可选择多个指数进行分析
                    </span>
                    <span style="font-family:'Microsoft YaHei';font-size:14px;">。
                    </span>
                  </div>
                </el-row>
                <el-row>
                  <label class="layui-form-label " style="width:160px;">
                    多样性估计指数<span class="red">*</span>
                    <!-- // 图标提示框 -->
                    <el-tooltip class="item" effect="dark" content="计算Alpha多样性估计指数" placement="right">
                      <i class="el-icon-edit" />
                    </el-tooltip>
                  </label>
                  <el-checkbox-group v-model="estimate_indices">
                    <el-checkbox label="sobs" />
                    <el-checkbox label="shannon" />
                    <el-checkbox label="simpson" />
                    <el-checkbox label="ace" />
                    <el-checkbox label="bootstrap" />
                    <el-checkbox label="chao" />
                    <el-checkbox label="coverage" />
                    <el-checkbox label="heip" />
                  </el-checkbox-group>
                </el-row>
              </el-collapse-item>
            </el-collapse>
            <el-row align="center">
              <el-col align="center">
                <el-button type="primary">保存</el-button>
                <el-button type="primary">保存并运行</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="分析管理" name="second">分析管理</el-tab-pane>
        </el-tabs>
      </el-card>
    </template>
  </Basiclayout>
</template>

<script>
export default {
  data() {
    return {
      Collapse_activeNames: ['1'],
      Tabs_activeName: 'first',
      radio: '1',
      // 原始数据
      labelPosition: 'right',
      raw_seq_formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      // 多样性分析选择 sobs shannon simpson ace bootstrap chao coverage heip invsimpson jack npshannon
      estimate_indices: ['sobs'],
      // 物种分类数据库类型
      database_value: '',
      database_options: [
        {
          value: '1',
          label: '北京本地数据库'
        },
        {
          value: '2',
          label: 'NCBI数据库'
        }
      ],
      // 分析方法
      anno_method_value: '',
      anno_method_options: [
        {
          value: '1',
          label: 'BLAST'
        }
      ],
      // 项目类型
      project_value: '',
      project_options: [
        {
          value: '1',
          label: '微生物多样性（二代）'
        }
      ],
      // 存储类型
      store_value: '',
      store_options: [
        {
          value: '1',
          label: '是'
        }
      ],
      // 工作流
      work_flow_value: '',
      work_flow_options: [
        {
          value: '1',
          label: 'true'
        },
        {
          value: '2',
          label: 'false'
        }
      ],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
<style scoped>
.layui-form-mid {
    float: left;
    display: block;
    padding: 9px 0!important;
    line-height: 20px;
    margin-right: 10px;
}
</style>
