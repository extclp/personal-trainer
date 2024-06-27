<template>
    <image class="h-36 w-full absolute top-0" src="@/static/teacher/bg.png" />
    <view class="p-4 pt-10">
        <sar-card>
            <view>
                <view class="relative top--8 flex items-end gap-2">
                    <nut-avatar :size="70" />
                    <view>
                        <view class="text-primary truncate">个人标签：超爱数学，超级牛的数学老师</view>
                        <view class="flex gap-2 mt-1">
                            <nut-tag type="primary" size="mini">22岁</nut-tag>
                            <nut-tag type="primary" size="mini">教龄：2年</nut-tag>
                            <nut-tag type="primary" size="mini">研究生教员</nut-tag>
                        </view>
                    </view>
                </view>

                <view class="mt-2 flex items-center gap-2">
                    <text class="text-5 font-700">朱飒</text>
                    <text>IP归属地：江苏</text>
                </view>
                <view class="mt-2">在校研究生；可线上教学</view>
            </view>
        </sar-card>
    </view>
    <view class="mx-4">任教信心</view>
    <sar-card class="m-4">
        <view>
            <view class="text-lg text-primary mb-2">教学经验</view>
            作为一名经验丰富的家教老师，我注重个性化教学，根据学生的需求和水平制定教学计划，耐心细致地指导学生，激发他们的学习兴趣和思考能力。我善于启发式教学，通过提问和讨论引导学生自主学习，同时给予他们充分的肯定和鼓励，促进他们的学习动力和自信心。
        </view>
    </sar-card>

    <sar-card class="m-4">
        <view>
            <view class="text-lg text-primary my-2">任教科目</view>
            初中 英语
            初中 数学
            初中 语文
            <view class="text-lg text-primary my-2">任教方式</view>
            <nut-tag type="primary">线上</nut-tag>
            <view class="text-lg text-primary my-2">任教地点</view>
            <nut-tag type="primary">南大街附近</nut-tag>
        </view>
    </sar-card>
    <sar-card class="m-4">
        <view class="text-lg text-primary my-2">任教时间</view>
        <table class="w-full">
            <tr>
                <th />
                <th v-for="d in '一二三四五六日'" :key="d">周{{ d }}</th>
            </tr>
            <tr v-for="(period, pi) in ['上午', '下午', '晚上']" :key="period">
                <th>{{ period }}</th>
                <th v-for="(d, index) in '一二三四五六日'" :key="d">
                    <Checkbox />
                </th>
            </tr>
        </table>
    </sar-card>
    <sar-card class="m-4">
        <view class="text-lg text-primary my-2">授课费用</view>
        ¥110/小时（查看平台参考标准）
        <view class="text-lg text-primary my-2">所获证书</view>
        暂无
    </sar-card>
    <view class="mx-4">教师评价</view>
    <sar-card class="m-4">
        <view class="flex gap-4">
            <image class="h-10 w-10 rounded-full bg-red mt-2" />
            <view class="flex-1 border border-slate-300 border-b-solid">
                <view class="text-sm">
                    <text class="float-right">2020-5-11</text>
                    <text>extclp</text>
                </view>
                <view class="my-3">测试</view>
            </view>
        </view>
    </sar-card>
</template>
<style>
table {
    border-collapse: collapse;
}

th {
    padding: 16rpx;
    border: 1px #fb7206 solid;

}
</style>