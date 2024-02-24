export class UsersRepository {
    constructor(prisma, redisClient) {
        this.prisma = prisma;
        this.redisClient = redisClient;
    }

    getUserByEmail = async (email) => {
        const user = await this.prisma.users.findFirst({ where: { email } });
        return user;
    };

    getUserById = async (userId) => {
        const user = await this.prisma.users.findFirst({ where: { userId: +userId } });
        return user;
    };
    decrementPoint = async (userId, amount) => {
        const user = await this.prisma.users.update({
            where: { userId: userId },
            data: {
                userpoint: {
                    decrement: amount,
                },
            },
        });

        return user;
    };
}
