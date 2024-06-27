<template>
    <image class="bg" url="@/static/teacher/bg.png" />
    <nut-cell>
        <view>
            <nut-avatar />
            <view>
                在校研究生；可线上教学
                22岁 教龄：2年 研究生教员
            </view>
        </view>

        <view>
            <text>朱飒</text>
            <text>IP归属地：江苏</text>
        </view>
    </nut-cell>
    <view>任教信心</view>
    <nut-cell>
        教学经验
        作为一名经验丰富的家教老师，我注重个性化教学，根据学生的需求和水平制定教学计划，耐心细致地指导学生，激发他们的学习兴趣和思考能力。我善于启发式教学，通过提问和讨论引导学生自主学习，同时给予他们充分的肯定和鼓励，促进他们的学习动力和自信心。
    </nut-cell>
    <nut-cell>
        任教科目
        初中 英语
        初中 数学
        初中 语文
        任教方式
        线上
        任教地点
        南大街附近
    </nut-cell>
    <nut-cell>
        授课费用
        ¥110/小时（查看平台参考标准）
        所获证书
        暂无
    </nut-cell>
    <view>教师评价</view>
    <nut-cell>
        <view class="m-4 flex gap-2">
            <sar-input v-model="message" class="flex-1 bg-white" />
            <button type="primary" size="mini" @click="sendMessage">发布留言</button>
        </view>
        <view v-for="message in data.message" :key="message.time" class="flex gap-4 px-7 py-4">
            <image class="h-10 w-10 rounded-full bg-white" />
            <view class="flex-1 border border-slate-300 border-b-solid">
                <view class="text-sm">
                    <text class="float-right">{{ ago(message.time) }}</text>
                    <text>{{ message.username }}</text>
                </view>
                <view class="m-4"> {{ message.message }} </view>
            </view>
        </view>
    </nut-cell>
</template>
<style>
.bg {
    height: 374px;
}

.nut-cell {
    position: absolute;
    left: 7px;
    right: 7px;
    top: 44px;
}
</style>