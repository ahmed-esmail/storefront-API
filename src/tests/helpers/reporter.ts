/* eslint-disable */
import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
import SuiteInfo = jasmine.SuiteInfo;
import CustomReporter = jasmine.CustomReporter;

class CustomProcessor extends DisplayProcessor {
    public displayJasmineStarted(info: SuiteInfo, log: string): string {
        return `${log}`;
    }
}

jasmine.getEnv().clearReporters();

jasmine.getEnv().addReporter((
    new SpecReporter({
        customProcessors: [CustomProcessor],
        spec: {
            displayStacktrace: StacktraceOption.NONE,
        },
        suite: {
            displayNumber: true,
        },
    })as unknown) as CustomReporter);
