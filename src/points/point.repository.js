export class PointsRepository {
    constructor(prisma, redisClient) {
        this.prisma = prisma;
        this.redisClient = redisClient;
    }
    getUserPoint = async (userId) => {
        const point = await this.prisma.userpoints.groupBy({
            by: ["userId"],
            where: { userId: +userId },
            _sum: {
                possession: true,
            },
        });

        return point;
    };

    userdecrementPoint = (userId, possession, history) => {
        const user = this.prisma.userpoints.create({
            data: {
                userId: +userId,
                possession: +possession,
                history: history,
            },
        });

        return user;
    };
    storedecrementPoint = (storeId, possession, history) => {
        const user = this.prisma.storepoints.create({
            data: {
                storeId: +storeId,
                possession: +possession,
                history: history,
            },
        });

        return user;
    };
}
