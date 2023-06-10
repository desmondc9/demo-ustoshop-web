import argparse
import logging
import os
import pprint

from alibabacloud_fc_open20210406 import models as fc__open_20210406_models
from alibabacloud_fc_open20210406.client import Client as FC_Open20210406Client
from alibabacloud_tea_openapi import models as open_api_models
from alibabacloud_tea_util import models as util_models
from alibabacloud_tea_util.client import Client as UtilClient

logger = logging.getLogger(__name__)

def create_client(
        accesskey_id: str,
        accesskey_secret: str,
        endpoint: str,
) -> FC_Open20210406Client:
    config = open_api_models.Config(
        access_key_id=accesskey_id,
        access_key_secret=accesskey_secret
    )
    config.endpoint = endpoint
    return FC_Open20210406Client(config)


def publish(
        accesskey_id: str,
        accesskey_secret: str,
        endpoint: str,
        image: str,
        service_name: str,
        function_name: str,
) -> None:
    client = create_client(
        accesskey_id=accesskey_id,
        accesskey_secret=accesskey_secret,
        endpoint=endpoint,
    )
    update_function_headers = fc__open_20210406_models.UpdateFunctionHeaders()
    custom_container_config = fc__open_20210406_models.CustomContainerConfig(
        image=image
    )
    update_function_request = fc__open_20210406_models.UpdateFunctionRequest(
        custom_container_config=custom_container_config
    )
    runtime = util_models.RuntimeOptions()
    try:
        result = client.update_function_with_options(
            service_name=service_name,
            function_name=function_name,
            request=update_function_request,
            headers=update_function_headers,
            runtime=runtime,
        )
        logger.info(pprint(result.to_map()))
    except Exception as error:
        err_msg = UtilClient.assert_as_string(error.message)
        logger.error(f'publish failed: {err_msg}')


def parse_arguments():
    parser = argparse.ArgumentParser()
    parser.add_argument(
        '--accesskey_id',
        type=str,
        help='Aliyun AccessKey ID',
        default=os.getenv('ALIBABA_CLOUD_ACCESS_KEY_ID', ""),
    )
    parser.add_argument(
        '--accesskey_secret',
        type=str,
        help='Aliyun AccessKey Secret',
        default=os.getenv('ALIBABA_CLOUD_ACCESS_KEY_SECRET', ""),
    )
    parser.add_argument(
        '--endpoint',
        type=str,
        help='Aliyun Function endpoint',
        default='1262247654510792.cn-shanghai.fc.aliyuncs.com',
    )
    parser.add_argument(
        '--image',
        type=str,
        help='Docker image url',
        default=f'registry.cn-shanghai.aliyuncs.com/shisanfan/dabaozhuanjia-web:{os.getenv("DOCKER_TAG", "latest")}',
    )
    parser.add_argument(
        '--service_name',
        type=str,
        help='Aliyun Function service name',
        default="dabaozhuanjia-services"
    )
    parser.add_argument(
        '--function_name',
        type=str,
        help='Aliyun Function function name',
        default="dabaozhuanjia-web"
    )
    args = parser.parse_args()
    return args


if __name__ == '__main__':
    args = parse_arguments()
    logger.info(f'arguments: {pprint(args)}')

    publish(
        accesskey_id=args.accesskey_id,
        accesskey_secret=args.accesskey_secret,
        endpoint=args.endpoint,
        image=args.image,
        service_name=args.service_name,
        function_name=args.function_name,
    )
