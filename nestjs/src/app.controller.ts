import { Controller, Get, Redirect } from "@nestjs/common";
import { AppService } from "@/app.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags("AppController")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "SnoozemoCom" })
  @Redirect("https://snoozemo.com", 301)
  async SnoozemoCom() {
    return { url: "https://snoozemo.com" };
  }
}
