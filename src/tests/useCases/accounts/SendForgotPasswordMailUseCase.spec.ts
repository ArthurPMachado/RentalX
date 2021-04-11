import UserRepositoryInMemory from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import UsersTokensRepositoryInMemory from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import SendForgotPasswordMailUseCase from "@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailUseCase";
import DayjsDateProvider from "@shared/container/providers/DateProvider/implementations/DayjsDateProvide";
import MailProviderInMemory from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UserRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "343719",
      email: "ije@bit.kw",
      name: "Jay Hampton",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ije@bit.kw");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "069081",
      email: "ra@vow.cv",
      name: "Harriet Ward",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("ra@vow.cv");

    expect(generateTokenMail).toBeCalled();
  });

  it("Should not be able to send a forgot password mail if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("nukirgo@pampeloh.ne")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });
});
