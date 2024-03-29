export class CouponsRepository {
    constructor(prisma, redisClient) {
        this.prisma = prisma;
        this.redisClient = redisClient;
    }
    discountCoupon = async (userId, couponname, couponuse, discount, couponhistory, amount, certainamount) => {
        const coupon = await this.prisma.coupons.create({
            data: {
                userId: +userId,
                couponname,
                couponuse,
                discount,
                couponhistory,
                amount,
                certainamount,
            },
        });
        return coupon;
    };
    percentageCoupon = async (userId, couponname, couponuse, discount, couponhistory, amount, certainamount) => {
        const coupon = await this.prisma.coupons.create({
            data: {
                userId: +userId,
                couponname,
                couponuse,
                discount,
                couponhistory,
                amount,
                certainamount,
            },
        });
        return coupon;
    };
    getCouponId = async (couponId) => {
        const coupon = await this.prisma.coupons.findFirst({
            where: { couponId: +couponId },
        });
        return coupon;
    };
    updeteCoupon = async (couponId, couponuse, history) => {
        const coupon = await this.prisma.coupons.update({
            where: { couponId: +couponId },
            data: { couponuse, couponhistory: history },
        });

        return coupon;
    };
}
